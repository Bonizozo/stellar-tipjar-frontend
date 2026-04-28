'use client';
import React from 'react';
import { Mentor, MentorshipSession } from '@/lib/mentorship-data';
import { Star, Users, MessageSquare, CheckCircle2 } from 'lucide-react';

export const MentorCard: React.FC<{ mentor: Mentor; onSelect: (id: string) => void }> = ({ mentor, onSelect }) => {
  return (
    <div className="mentor-card fade-in">
      <div className="mentor-header">
        <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar" />
        <div className="mentor-info">
          <h3>{mentor.name}</h3>
          <div className="mentor-rating">
            <Star size={16} fill="currentColor" />
            <span>{mentor.rating}</span>
            <span style={{ color: 'var(--mentor-text-muted)', fontSize: '0.8rem' }}>
              ({mentor.sessionsCompleted} sessions)
            </span>
          </div>
        </div>
      </div>
      
      <div className="expertise-tags">
        {mentor.expertise.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <p className="mentor-bio">{mentor.bio}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: var(--mentor-primary) }}>
          {mentor.pricePerSession || 'Contact for price'}
        </div>
        <button 
          className="btn-mentor" 
          style={{ width: 'auto', padding: '10px 24px' }}
          disabled={!mentor.isAvailable}
          onClick={() => onSelect(mentor.id)}
        >
          {mentor.isAvailable ? 'Request Mentorship' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export const MentorshipProgress: React.FC<{ session: MentorshipSession }> = ({ session }) => {
  return (
    <div className="mentor-card" style={{ gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Current Progress</h3>
        <span style={{ color: 'var(--mentor-primary)', fontWeight: 'bold' }}>{session.progress}%</span>
      </div>
      
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            width: `${session.progress}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, var(--mentor-primary), var(--mentor-secondary))',
            transition: 'width 0.5s ease'
          }} 
        />
      </div>
      
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {session.milestones.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: m.completed ? 1 : 0.5 }}>
            <CheckCircle2 size={18} color={m.completed ? 'var(--mentor-primary)' : '#666'} />
            <span style={{ fontSize: '0.9rem' }}>{m.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
