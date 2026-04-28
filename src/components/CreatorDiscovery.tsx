'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  tags: string[];
  followers: number;
  totalTips: number;
  featured: boolean;
}

const CATEGORIES = [
  { id: 'art', name: 'Art & Design', icon: '🎨' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'food', name: 'Food & Cooking', icon: '🍳' },
];

export default function CreatorDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const mockCreators: Creator[] = [
    {
      id: '1',
      name: 'Jane Artist',
      username: 'janeartist',
      avatar: '/default-avatar.png',
      category: 'art',
      tags: ['digital', 'illustration', 'portrait'],
      followers: 1250,
      totalTips: 450,
      featured: true,
    },
    {
      id: '2',
      name: 'Music Maker',
      username: 'musicmaker',
      avatar: '/default-avatar.png',
      category: 'music',
      tags: ['electronic', 'producer', 'beats'],
      followers: 3400,
      totalTips: 890,
      featured: true,
    },
  ];

  const filteredCreators = mockCreators.filter(creator => {
    if (selectedCategory && creator.category !== selectedCategory) return false;
    if (showFeaturedOnly && !creator.featured) return false;
    if (selectedTags.length > 0 && !selectedTags.some(tag => creator.tags.includes(tag))) return false;
    return true;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Discover Creators</h1>
      <p className="text-gray-600 mb-8">Find and support amazing creators</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-medium">Featured Creators Only</span>
        </label>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {['digital', 'illustration', 'electronic', 'producer', 'tutorial', 'live', 'original'].map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map(creator => (
          <Link
            key={creator.id}
            href={`/creator/${creator.username}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {creator.featured && (
              <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-3">
                ⭐ Featured
              </div>
            )}
            <div className="flex items-center gap-4 mb-4">
              <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="font-bold text-lg">{creator.name}</h3>
                <p className="text-gray-600">@{creator.username}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {creator.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{creator.followers} followers</span>
              <span>{creator.totalTips} tips received</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
