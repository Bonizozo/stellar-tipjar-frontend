'use client';
import React from 'react';
import { COURSES, BADGES } from '@/lib/certification-data';
import { CourseCard, BadgeItem } from '@/components/Certification/CourseComponents';
import { useCertificationStore } from '@/store/useCertificationStore';
import '@/styles/certification.css';

export default function CertificationDashboard() {
  const { earnedBadgeIds, completedCourseIds } = useCertificationStore();

  return (
    <div className="cert-container">
      <div className="cert-header">
        <h1 className="cert-title">Creator Certification</h1>
        <p className="cert-subtitle">Enhance your skills, earn badges, and build trust with your supporters.</p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your Badges</h2>
        <div className="badge-display">
          {BADGES.map(badge => (
            <BadgeItem
              key={badge.id}
              name={badge.name}
              icon={badge.icon}
              color={badge.color}
              isEarned={earnedBadgeIds.includes(badge.id)}
            />
          ))}
          {BADGES.length === 0 && (
            <p style={{ color: 'var(--cert-text-muted)' }}>Complete courses to earn your first badge!</p>
          )}
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Available Courses</h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--cert-text-muted)' }}>
            {completedCourseIds.length} / {COURSES.length} Courses Completed
          </div>
        </div>
        <div className="course-grid">
          {COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
