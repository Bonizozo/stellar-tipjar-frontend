'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MENTORS } from '@/lib/mentorship-data';
import { MentorshipProgress } from '@/components/Mentorship/MentorshipComponents';
import { useMentorshipStore } from '@/store/useMentorshipStore';
import '@/styles/mentorship.css';
import { Send, ChevronLeft, Info, MoreVertical } from 'lucide-react';

export default function MentorshipChatPage() {
  const { id } = useParams();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState('');
  
  const mentor = MENTORS.find(m => m.id === id);
  const { sessions, messages, sendMessage, requestMentorship } = useMentorshipStore();
  
  // Find existing session or create one
  let session = sessions.find(s => s.mentorId === id);
  
  useEffect(() => {
    if (!session && id) {
      requestMentorship(id as string, 'current-user');
    }
  }, [id, session, requestMentorship]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!mentor) return <div>Mentor not found</div>;
  if (!session) return <div>Initialising session...</div>;

  const sessionMessages = messages.filter(m => m.sessionId === session.id);

  const handleSend = () => {
    if (!messageText.trim()) return;
    sendMessage(session.id, 'current-user', messageText);
    setMessageText('');
  };

  return (
    <div className="mentor-container" style={{ padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        
        <div className="chat-container">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => router.push('/mentorship')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <ChevronLeft size={24} />
              </button>
              <img src={mentor.avatar} alt={mentor.name} style={{ width: '40px', height: '40px', borderRadius: '12px' }} />
              <div>
                <h4 style={{ margin: 0 }}>{mentor.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--mentor-primary)' }}>Active Session</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Info size={20} color="var(--mentor-text-muted)" style={{ cursor: 'pointer' }} />
              <MoreVertical size={20} color="var(--mentor-text-muted)" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            <div className="message-bubble message-received" style={{ textAlign: 'center', alignSelf: 'center', background: 'none', color: 'var(--mentor-text-muted)' }}>
              This is the beginning of your mentorship journey with {mentor.name}.
            </div>
            
            {sessionMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`message-bubble ${msg.senderId === 'current-user' ? 'message-sent' : 'message-received'}`}
              >
                {msg.text}
                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Type your message..." 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-mentor" style={{ width: 'auto', padding: '12px' }} onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <MentorshipProgress session={session} />
          
          <div className="mentor-card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Feedback System</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--mentor-text-muted)', marginBottom: '1.5rem' }}>
              Your feedback helps {mentor.name} improve and assists other creators.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={24} color="#666" style={{ cursor: 'pointer' }} />
              ))}
            </div>
            <textarea 
              placeholder="Leave a review..." 
              style={{ 
                width: '100%', 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid var(--mentor-border)', 
                borderRadius: '12px', 
                padding: '12px',
                color: 'white',
                minHeight: '100px',
                marginBottom: '1rem',
                outline: 'none'
              }}
            />
            <button className="btn-mentor" style={{ background: 'var(--mentor-primary)' }}>Submit Feedback</button>
          </div>
        </div>

      </div>
    </div>
  );
}
