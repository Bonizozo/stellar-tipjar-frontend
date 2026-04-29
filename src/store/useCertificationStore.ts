import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CertificationState {
  completedCourseIds: string[];
  earnedBadgeIds: string[];
  userScores: Record<string, number>;
  completeCourse: (courseId: string, score: number) => void;
  earnBadge: (badgeId: string) => void;
}

export const useCertificationStore = create<CertificationState>()(
  persist(
    (set) => ({
      completedCourseIds: [],
      earnedBadgeIds: [],
      userScores: {},
      completeCourse: (courseId, score) =>
        set((state) => ({
          completedCourseIds: state.completedCourseIds.includes(courseId)
            ? state.completedCourseIds
            : [...state.completedCourseIds, courseId],
          userScores: { ...state.userScores, [courseId]: score },
        })),
      earnBadge: (badgeId) =>
        set((state) => ({
          earnedBadgeIds: state.earnedBadgeIds.includes(badgeId)
            ? state.earnedBadgeIds
            : [...state.earnedBadgeIds, badgeId],
        })),
    }),
    {
      name: 'certification-storage',
    }
  )
);
