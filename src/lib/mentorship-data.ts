export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  bio: string;
  rating: number;
  sessionsCompleted: number;
  isAvailable: boolean;
  pricePerSession?: string;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  progress: number; // 0 to 100
  milestones: { title: string; completed: boolean }[];
  lastMessage?: string;
}

export interface Message {
  id: string;
  sessionId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Alex Rivera',
    avatar: 'https://i.pravatar.cc/150?u=m1',
    expertise: ['Stellar SDK', 'Smart Contracts', 'DeFi'],
    bio: 'Experienced blockchain developer with a passion for helping others build on Stellar.',
    rating: 4.9,
    sessionsCompleted: 45,
    isAvailable: true,
    pricePerSession: '50 XLM'
  },
  {
    id: 'm2',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=m2',
    expertise: ['UI/UX Design', 'Creator Economy', 'Marketing'],
    bio: 'Product designer focused on helping creators build beautiful and engaging platforms.',
    rating: 4.8,
    sessionsCompleted: 32,
    isAvailable: true,
    pricePerSession: 'Free'
  },
  {
    id: 'm3',
    name: 'David Smith',
    avatar: 'https://i.pravatar.cc/150?u=m3',
    expertise: ['Anchor Integration', 'Compliance', 'Security'],
    bio: 'Security expert with years of experience in financial technology and Stellar anchors.',
    rating: 5.0,
    sessionsCompleted: 12,
    isAvailable: false
  }
];
