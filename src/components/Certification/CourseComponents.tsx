'use client';
import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/certification-data';
import { useCertificationStore } from '@/store/useCertificationStore';
import { CheckCircle, Clock, BarChart } from 'lucide-react';

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { completedCourseIds } = useCertificationStore();
  const isCompleted = completedCourseIds.includes(course.id);

  return (
    <div className="course-card fade-in">
      <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
      <div className="course-content">
        <div className="course-level">{course.level}</div>
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>
        
        <div className="course-footer">
          <div className="course-meta">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="course-meta">
            <BarChart size={16} />
            <span>{course.quiz.length} Questions</span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link href={`/certification/courses/${course.id}`}>
            <button className="btn-start" style={{ width: '100%' }}>
              {isCompleted ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle size={18} /> Revisit Course
                </span>
              ) : 'Start Certification'}
            </button>
          </Link>
        </div>
      </div>
      {isCompleted && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: '#00B2FF',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          boxShadow: '0 0 15px rgba(0, 178, 255, 0.5)'
        }}>
          COMPLETED
        </div>
      )}
    </div>
  );
};

export const BadgeItem: React.FC<{ name: string; icon: string; color: string; isEarned: boolean }> = ({ 
  name, icon, color, isEarned 
}) => {
  return (
    <div className={`badge-item ${isEarned ? 'earned' : ''}`} style={{ opacity: isEarned ? 1 : 0.3 }}>
      <div style={{ color: isEarned ? color : '#666' }}>
        {/* Placeholder icons using text if SVG paths are complex, but I'll use Lucide for consistency */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{name}</span>
        </div>
      </div>
    </div>
  );
};
