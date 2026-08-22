'use client';

import { useState } from 'react';

interface ScheduledTip {
  id: string;
  recipient: string;
  amount: number;
  currency: string;
  scheduledDate: string;
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
  status: 'pending' | 'completed' | 'cancelled';
}

export default function TipScheduler() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [scheduledTips, setScheduledTips] = useState<ScheduledTip[]>([]);

  const handleScheduleTip = async () => {
    if (!amount || !recipient || !scheduledDate || !scheduledTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newTip: ScheduledTip = {
      id: Date.now().toString(),
      recipient,
      amount: parseFloat(amount),
      currency: 'XLM',
      scheduledDate: `${scheduledDate}T${scheduledTime}`,
      recurring: isRecurring,
      frequency: isRecurring ? frequency : undefined,
      status: 'pending',
    };

    setScheduledTips([...scheduledTips, newTip]);

    // Reset form
    setAmount('');
    setRecipient('');
    setScheduledDate('');
    setScheduledTime('');
    setIsRecurring(false);

    // TODO: Send to backend
    // await fetch('/api/tips/schedule', {
    //   method: 'POST',
    //   body: JSON.stringify(newTip)
    // });
  };

  const handleCancelTip = async (tipId: string) => {
    if (!confirm('Cancel this scheduled tip?')) return;

    setScheduledTips(scheduledTips.map(tip =>
      tip.id === tipId ? { ...tip, status: 'cancelled' } : tip
    ));

    // TODO: Send to backend
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Schedule Tips</h1>
      <p className="text-gray-600 mb-8">Schedule one-time or recurring tips</p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">New Scheduled Tip</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Recipient Username</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount (XLM)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-medium">Make this a recurring tip</span>
          </label>
        </div>

        {isRecurring && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        <button
          onClick={handleScheduleTip}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Schedule Tip
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Tips</h2>

        {scheduledTips.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No scheduled tips yet</p>
        ) : (
          <div className="space-y-4">
            {scheduledTips.map(tip => (
              <div
                key={tip.id}
                className={`border rounded-lg p-4 ${
                  tip.status === 'cancelled' ? 'bg-gray-50 opacity-60' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-lg">
                      {tip.amount} {tip.currency} → @{tip.recipient}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(tip.scheduledDate).toLocaleString()}
                    </div>
                    {tip.recurring && (
                      <div className="text-sm text-blue-600 mt-1">
                        🔄 Recurring {tip.frequency}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tip.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : tip.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tip.status}
                    </span>
                    {tip.status === 'pending' && (
                      <button
                        onClick={() => handleCancelTip(tip.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
