'use client';

import { useState } from 'react';

interface NotificationChannel {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

interface NotificationCategory {
  tips: NotificationChannel;
  comments: NotificationChannel;
  followers: NotificationChannel;
  milestones: NotificationChannel;
  system: NotificationChannel;
}

interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationCategory>({
    tips: { email: true, push: true, inApp: true },
    comments: { email: true, push: true, inApp: true },
    followers: { email: false, push: true, inApp: true },
    milestones: { email: true, push: true, inApp: true },
    system: { email: true, push: false, inApp: true },
  });

  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  });

  const [saving, setSaving] = useState(false);

  const categories = [
    { key: 'tips', label: 'Tips Received', description: 'When someone sends you a tip' },
    { key: 'comments', label: 'Comments', description: 'Comments on your tips' },
    { key: 'followers', label: 'New Followers', description: 'When someone follows you' },
    { key: 'milestones', label: 'Milestones', description: 'Achievement notifications' },
    { key: 'system', label: 'System Updates', description: 'Platform announcements' },
  ];

  const handleChannelToggle = (category: keyof NotificationCategory, channel: keyof NotificationChannel) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel],
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, quietHours }),
      });
      
      if (!response.ok) throw new Error('Failed to save preferences');
      
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Notification Preferences</h1>
      <p className="text-gray-600 mb-8">Customize how you receive notifications</p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Categories</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Category</th>
                <th className="text-center py-3 px-2">Email</th>
                <th className="text-center py-3 px-2">Push</th>
                <th className="text-center py-3 px-2">In-App</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(({ key, label, description }) => (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="py-4 px-2">
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <input
                      type="checkbox"
                      checked={preferences[key as keyof NotificationCategory].email}
                      onChange={() => handleChannelToggle(key as keyof NotificationCategory, 'email')}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                  <td className="text-center py-4 px-2">
                    <input
                      type="checkbox"
                      checked={preferences[key as keyof NotificationCategory].push}
                      onChange={() => handleChannelToggle(key as keyof NotificationCategory, 'push')}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                  <td className="text-center py-4 px-2">
                    <input
                      type="checkbox"
                      checked={preferences[key as keyof NotificationCategory].inApp}
                      onChange={() => handleChannelToggle(key as keyof NotificationCategory, 'inApp')}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Quiet Hours</h2>
        <p className="text-gray-600 mb-4">Pause notifications during specific hours</p>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="quietHoursEnabled"
            checked={quietHours.enabled}
            onChange={(e) => setQuietHours(prev => ({ ...prev, enabled: e.target.checked }))}
            className="w-5 h-5 cursor-pointer mr-3"
          />
          <label htmlFor="quietHoursEnabled" className="font-medium cursor-pointer">
            Enable Quiet Hours
          </label>
        </div>

        {quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={quietHours.startTime}
                onChange={(e) => setQuietHours(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={quietHours.endTime}
                onChange={(e) => setQuietHours(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
