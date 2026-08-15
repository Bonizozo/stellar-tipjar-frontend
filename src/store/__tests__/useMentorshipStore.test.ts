import { describe, it, expect, beforeEach } from 'vitest';
import { useMentorshipStore } from '../useMentorshipStore';

describe('useMentorshipStore', () => {
  beforeEach(() => {
    useMentorshipStore.setState({ sessions: [], messages: [] });
  });

  it('creates and tracks new mentorship sessions with default milestones', () => {
    const store = useMentorshipStore.getState();
    const sessionId = store.requestMentorship('mentor-alice', 'mentee-bob');

    const session = useMentorshipStore.getState().getSessionById(sessionId);
    expect(session).toBeDefined();
    expect(session?.mentorId).toBe('mentor-alice');
    expect(session?.menteeId).toBe('mentee-bob');
    expect(session?.status).toBe('pending');
    expect(session?.progress).toBe(0);
    expect(session?.milestones).toHaveLength(4);
  });

  it('records messages and updates lastMessage on the corresponding session', () => {
    const store = useMentorshipStore.getState();
    const sessionId = store.requestMentorship('mentor-alice', 'mentee-bob');

    store.sendMessage(sessionId, 'mentee-bob', 'Hello Alice!');

    const messages = useMentorshipStore.getState().getMessagesBySessionId(sessionId);
    expect(messages).toHaveLength(1);
    expect(messages[0].text).toBe('Hello Alice!');
    expect(messages[0].senderId).toBe('mentee-bob');

    const updatedSession = useMentorshipStore.getState().getSessionById(sessionId);
    expect(updatedSession?.lastMessage).toBe('Hello Alice!');
  });

  it('completes milestones and recalculates session progress percentage', () => {
    const store = useMentorshipStore.getState();
    const sessionId = store.requestMentorship('mentor-alice', 'mentee-bob');

    store.completeMilestone(sessionId, 0); // 1 out of 4 = 25%

    let session = useMentorshipStore.getState().getSessionById(sessionId);
    expect(session?.milestones[0].completed).toBe(true);
    expect(session?.progress).toBe(25);

    store.completeMilestone(sessionId, 1); // 2 out of 4 = 50%
    session = useMentorshipStore.getState().getSessionById(sessionId);
    expect(session?.progress).toBe(50);
  });

  it('updates overall progress manually when updateProgress is called', () => {
    const store = useMentorshipStore.getState();
    const sessionId = store.requestMentorship('mentor-alice', 'mentee-bob');

    store.updateProgress(sessionId, 75);

    const session = useMentorshipStore.getState().getSessionById(sessionId);
    expect(session?.progress).toBe(75);
  });
});
