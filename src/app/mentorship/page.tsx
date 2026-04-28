'use client';
import React, { useState, useEffect } from 'react';
import { MENTORS } from '@/lib/mentorship-data';
import { MentorCard } from '@/components/Mentorship/MentorshipComponents';
import '@/styles/mentorship.css';
import { Sparkles, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MentorshipDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchedMentor, setMatchedMentor] = useState<string | null>(null);

  const filteredMentors = MENTORS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const runMatchingAlgorithm = () => {
    setIsMatching(true);
    setTimeout(() => {
      const randomMentor = MENTORS[Math.floor(Math.random() * MENTORS.length)];
      setMatchedMentor(randomMentor.id);
      setIsMatching(false);
      // Scroll to matched mentor
      document.getElementById(`mentor-${randomMentor.id}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
  };

  return (
    <div className="mentor-container">
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '1rem' }}>
          Accelerate Your <span style={{ color: 'var(--mentor-primary)' }}>Growth</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--mentor-text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Connect with industry experts on the Stellar network and take your project to the next level.
        </p>
        
        <div style={{ 
          display: 'flex', 
          maxWidth: '600px', 
          margin: '0 auto', 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid var(--mentor-border)',
          borderRadius: '24px',
          padding: '8px',
          gap: '8px'
        }}>
          <div style={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
            <Search size={20} color="var(--mentor-text-muted)" />
            <input 
              type="text" 
              placeholder="Search by name or expertise..." 
              style={{ background: 'none', border: 'none', color: 'white', padding: '12px', width: '100%', outline: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="btn-mentor" 
            style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px' }}
            onClick={runMatchingAlgorithm}
          >
            <Sparkles size={18} /> Smart Match
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMatching && (
          <motion.div 
            className="match-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="match-card">
              <Sparkles size={60} color="var(--mentor-primary)" style={{ margin: '0 auto 2rem' }} className="spin" />
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI Matching in Progress...</h2>
              <p style={{ color: 'var(--mentor-text-muted)' }}>Analyzing your project needs and mentor expertise to find the perfect fit.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Available Mentors</h2>
        <button style={{ background: 'none', border: 'none', color: 'var(--mentor-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      <div className="mentor-grid">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} id={`mentor-${mentor.id}`}>
            <MentorCard 
              mentor={mentor} 
              onSelect={(id) => window.location.href = `/mentorship/chat/${id}`} 
            />
          </div>
        ))}
      </div>
      
      {filteredMentors.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <p style={{ color: 'var(--mentor-text-muted)', fontSize: '1.2rem' }}>No mentors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
