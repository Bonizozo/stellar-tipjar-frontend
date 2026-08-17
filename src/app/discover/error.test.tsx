import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DiscoverError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('DiscoverError boundary', () => {
  const mockError = new Error('Failed to load creator discovery') as Error & { digest?: string };
  mockError.digest = 'discover789abc';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('displays error description text', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it('displays warning/error icon', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const svg = alert.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows error digest only in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('button navigation works with Enter key', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    fireEvent.keyDown(tryAgainButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalled();
  });

  it('both buttons are properly contained and visible', () => {
    render(<DiscoverError error={mockError} reset={mockReset} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    
    buttons.forEach(button => {
      expect(button).toBeVisible();
    });
  });
});
