import { describe, it, expect } from 'vitest';
import {
  formatTime,
  parseTimeToSeconds,
  getProgressPercentage,
  calculateSeekTime,
} from '@/utils/videoHelpers';

describe('videoHelpers', () => {
  describe('formatTime', () => {
    it('formats seconds to MM:SS', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(30)).toBe('0:30');
      expect(formatTime(90)).toBe('1:30');
      expect(formatTime(125)).toBe('2:05');
    });

    it('formats hours when needed', () => {
      expect(formatTime(3600)).toBe('1:00:00');
      expect(formatTime(3661)).toBe('1:01:01');
      expect(formatTime(7325)).toBe('2:02:05');
    });

    it('handles invalid input', () => {
      expect(formatTime(-10)).toBe('0:00');
      expect(formatTime(Infinity)).toBe('0:00');
      expect(formatTime(NaN)).toBe('0:00');
    });
  });

  describe('parseTimeToSeconds', () => {
    it('parses HH:MM:SS format', () => {
      expect(parseTimeToSeconds('1:30:45')).toBe(5445);
      expect(parseTimeToSeconds('0:05:30')).toBe(330);
    });

    it('parses MM:SS format', () => {
      expect(parseTimeToSeconds('5:30')).toBe(330);
      expect(parseTimeToSeconds('0:45')).toBe(45);
    });

    it('parses SS format', () => {
      expect(parseTimeToSeconds('30')).toBe(30);
      expect(parseTimeToSeconds('0')).toBe(0);
    });
  });

  describe('getProgressPercentage', () => {
    it('calculates percentage correctly', () => {
      expect(getProgressPercentage(50, 100)).toBe(50);
      expect(getProgressPercentage(25, 100)).toBe(25);
      expect(getProgressPercentage(75, 100)).toBe(75);
    });

    it('handles edge cases', () => {
      expect(getProgressPercentage(0, 100)).toBe(0);
      expect(getProgressPercentage(100, 100)).toBe(100);
      expect(getProgressPercentage(50, 0)).toBe(0);
    });
  });

  describe('calculateSeekTime', () => {
    it('calculates seek time from click position', () => {
      expect(calculateSeekTime(50, 100, 200)).toBe(100);
      expect(calculateSeekTime(25, 100, 200)).toBe(50);
      expect(calculateSeekTime(75, 100, 200)).toBe(150);
    });

    it('handles edge positions', () => {
      expect(calculateSeekTime(0, 100, 200)).toBe(0);
      expect(calculateSeekTime(100, 100, 200)).toBe(200);
    });
  });
});
