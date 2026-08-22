'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { COURSES } from '@/lib/certification-data';
import { Quiz } from '@/components/Certification/Quiz';
import '@/styles/certification.css';
import { ChevronLeft, BookOpen, GraduationCap } from 'lucide-react';

export default function CoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);

  const course = COURSES.find(c => c.id === id);

  if (!course) {
    return (
      <div className="cert-container" style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <h1>Course Not Found</h1>
        <button className="btn-start" onClick={() => router.push('/certification')}>Back to Catalog</button>
      </div>
    );
  }

  return (
    <div className="cert-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button 
          onClick={() => router.push('/certification')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'none', 
            border: 'none', 
            color: 'var(--cert-text-muted)', 
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          <ChevronLeft size={20} /> Back to Courses
        </button>

        {!showQuiz ? (
          <div className="fade-in">
            <div className="cert-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
              <div className="course-level" style={{ marginBottom: '1rem' }}>{course.level}</div>
              <h1 className="cert-title" style={{ fontSize: '3.5rem' }}>{course.title}</h1>
              <p className="cert-subtitle" style={{ maxWidth: '800px' }}>{course.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
              <div className="quiz-container" style={{ margin: 0, maxWidth: 'none', padding: '2.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  <BookOpen color="var(--cert-primary)" /> Lessons
                </h2>
                {course.lessons.map((lesson, index) => (
                  <div key={index} style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--cert-glass-border)' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--cert-primary)' }}>
                      {index + 1}. {lesson.title}
                    </h3>
                    <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>{lesson.content}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="course-card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Certification Requirements</h3>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--cert-text-muted)', fontSize: '0.95rem' }}>
                    <li>Review all lesson materials</li>
                    <li>Complete the interactive quiz</li>
                    <li>Score at least 70% to pass</li>
                    <li>Earn the "{course.badgeId}" badge</li>
                  </ul>
                  <button 
                    className="btn-start" 
                    style={{ width: '100%', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    onClick={() => setShowQuiz(true)}
                  >
                    <GraduationCap size={20} /> Take Certification Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1 className="cert-title">Quiz: {course.title}</h1>
              <p className="cert-subtitle">Test your knowledge and earn your certification.</p>
            </div>
            <Quiz 
              questions={course.quiz} 
              courseId={course.id} 
              courseTitle={course.title}
              badgeId={course.badgeId} 
              onComplete={(score) => console.log('Quiz completed with score:', score)}
            />
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--cert-text-muted)', cursor: 'pointer' }}
                onClick={() => setShowQuiz(false)}
              >
                Cancel and return to lessons
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
