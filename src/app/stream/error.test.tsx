import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StreamError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('StreamError boundary', () => {
  const mockError = new Error('Failed to load live stream') as Error & { digest?: string };
  mockError.digest = 'stream456def';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('role', 'alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('provides error description', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it('displays error icon/svg', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const svg = alert.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows error digest in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<StreamError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('does not show digest in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(<StreamError error={mockError} reset={mockReset} />);
    
    expect(screen.queryByText(new RegExp(mockError.digest!))).not.toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('both action buttons are visible and clickable', () => {
    render(<StreamError error={mockError} reset={mockReset} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    
    buttons.forEach(button => {
      expect(button).toBeVisible();
      expect(button).not.toBeDisabled();
    });
  });
});
