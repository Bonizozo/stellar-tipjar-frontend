export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: { title: string; content: string }[];
  quiz: Question[];
  badgeId: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // SVG path or URL
  color: string;
}

export const COURSES: Course[] = [
  {
    id: 'stellar-basics',
    title: 'Stellar Fundamentals',
    description: 'Learn the core concepts of the Stellar network, assets, and transactions.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832',
    duration: '2 hours',
    level: 'Beginner',
    lessons: [
      { title: 'What is Stellar?', content: 'Stellar is an open-source network for currencies and payments...' },
      { title: 'Assets and Anchors', content: 'Anchors are highly dependable entities that people use to deposit and withdraw money...' }
    ],
    quiz: [
      {
        id: 'q1',
        text: 'What is the native asset of the Stellar network?',
        options: ['BTC', 'ETH', 'XLM', 'USDC'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        text: 'What consensus algorithm does Stellar use?',
        options: ['Proof of Work', 'Proof of Stake', 'Stellar Consensus Protocol (SCP)', 'PBFT'],
        correctAnswer: 2
      }
    ],
    badgeId: 'badge-stellar-basic'
  },
  {
    id: 'smart-contracts-soroban',
    title: 'Soroban Smart Contracts',
    description: 'Master the art of building decentralized applications using Soroban on Stellar.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2832',
    duration: '5 hours',
    level: 'Intermediate',
    lessons: [
      { title: 'Introduction to Soroban', content: 'Soroban is a smart contracts platform designed to be sensible, built-to-last, and batteries-included...' }
    ],
    quiz: [
      {
        id: 's1',
        text: 'Which language is primarily used for Soroban smart contracts?',
        options: ['Solidity', 'Rust', 'JavaScript', 'Python'],
        correctAnswer: 1
      }
    ],
    badgeId: 'badge-soroban-expert'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-stellar-basic',
    name: 'Stellar Explorer',
    description: 'Awarded for completing Stellar Fundamentals.',
    icon: 'sparkles',
    color: '#00B2FF'
  },
  {
    id: 'badge-soroban-expert',
    name: 'Soroban Architect',
    description: 'Awarded for mastering smart contracts.',
    icon: 'shield-check',
    color: '#8A2BE2'
  }
];
