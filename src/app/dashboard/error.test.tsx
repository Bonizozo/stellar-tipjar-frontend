import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('DashboardError boundary', () => {
  const mockError = new Error('Dashboard widget failed to load') as Error & { digest?: string };
  mockError.digest = 'abc123def456';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<DashboardError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.message))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('shows error digest in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<DashboardError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('try again button is keyboard accessible', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    expect(tryAgainButton.tagName).toBe('BUTTON');
  });

  it('displays error warning icon', () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const warningIcon = alert.querySelector('svg');
    expect(warningIcon).toBeInTheDocument();
  });
});
