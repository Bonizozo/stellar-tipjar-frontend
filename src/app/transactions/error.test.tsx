import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TransactionsError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('TransactionsError boundary', () => {
  const mockError = new Error('Failed to load transaction history') as Error & { digest?: string };
  mockError.digest = 'tx456error789';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('error message is descriptive', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it('displays error icon', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const warningIcon = alert.querySelector('svg');
    expect(warningIcon).toBeInTheDocument();
  });

  it('shows error digest in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('reset and go home buttons are both clickable', () => {
    render(<TransactionsError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    
    fireEvent.click(tryAgainButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
    
    fireEvent.click(goHomeButton);
    expect(mockReset).toHaveBeenCalledTimes(1); // goHome doesn't call reset
  });
});
