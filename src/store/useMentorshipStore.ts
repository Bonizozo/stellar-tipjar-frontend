import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Mentor, MentorshipSession, Message } from '@/lib/mentorship-data';

interface MentorshipState {
  sessions: MentorshipSession[];
  messages: Message[];
  requestMentorship: (mentorId: string, menteeId: string) => string;
  sendMessage: (sessionId: string, senderId: string, text: string) => void;
  updateProgress: (sessionId: string, progress: number) => void;
  completeMilestone: (sessionId: string, milestoneIndex: number) => void;
}

export const useMentorshipStore = create<MentorshipState>()(
  persist(
    (set, get) => ({
      sessions: [],
      messages: [],
      requestMentorship: (mentorId, menteeId) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newSession: MentorshipSession = {
          id,
          mentorId,
          menteeId,
          status: 'pending',
          progress: 0,
          milestones: [
            { title: 'Initial Consultation', completed: false },
            { title: 'Goal Setting', completed: false },
            { title: 'Project Kickoff', completed: false },
            { title: 'Final Review', completed: false }
          ]
        };
        set((state) => ({ sessions: [...state.sessions, newSession] }));
        return id;
      },
      sendMessage: (sessionId, senderId, text) => {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          sessionId,
          senderId,
          text,
          timestamp: new Date().toISOString()
        };
        set((state) => ({ 
          messages: [...state.messages, newMessage],
          sessions: state.sessions.map(s => s.id === sessionId ? { ...s, lastMessage: text } : s)
        }));
      },
      updateProgress: (sessionId, progress) => {
        set((state) => ({
          sessions: state.sessions.map(s => s.id === sessionId ? { ...s, progress } : s)
        }));
      },
      completeMilestone: (sessionId, milestoneIndex) => {
        set((state) => {
          const sessions = state.sessions.map(s => {
            if (s.id === sessionId) {
              const milestones = [...s.milestones];
              milestones[milestoneIndex].completed = true;
              const completedCount = milestones.filter(m => m.completed).length;
              const progress = Math.round((completedCount / milestones.length) * 100);
              return { ...s, milestones, progress };
            }
            return s;
          });
          return { sessions };
        });
      }
    }),
    {
      name: 'mentorship-storage',
    }
  )
);
