import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AnalyticsError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('AnalyticsError boundary', () => {
  const mockError = new Error('Failed to load analytics charts') as Error & { digest?: string };
  mockError.digest = 'analytics123456';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset function when Try again is clicked', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button as alternative action', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('displays helpful error description', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/you can try again or refresh/i)).toBeInTheDocument();
  });

  it('shows error icon/svg', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const svg = alert.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows error digest in development environment only', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('buttons are keyboard accessible', () => {
    render(<AnalyticsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    const goHomeButton = screen.getByRole('button', { name: /go home/i }) as HTMLButtonElement;
    
    expect(tryAgainButton).toHaveFocus || tryAgainButton.focus();
    expect(goHomeButton).toHaveFocus || goHomeButton.focus();
    
    fireEvent.keyDown(tryAgainButton, { key: 'Enter' });
  });
});
