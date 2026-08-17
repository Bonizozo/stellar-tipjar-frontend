import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreatorError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('CreatorError boundary', () => {
  const mockError = new Error('Failed to load creator profile') as Error & { digest?: string };
  mockError.digest = 'creator321jkl';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('role', 'alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button as alternative action', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('provides descriptive error message', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/try again or refresh/i)).toBeInTheDocument();
  });

  it('displays error icon', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const svg = alert.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows error digest in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<CreatorError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('does not show error digest in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(<CreatorError error={mockError} reset={mockReset} />);
    
    expect(screen.queryByText(new RegExp(mockError.digest!))).not.toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('reset button is keyboard accessible', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    expect(tryAgainButton).not.toBeDisabled();
    
    fireEvent.keyDown(tryAgainButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalled();
  });

  it('renders both primary and secondary actions', () => {
    render(<CreatorError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    
    expect(tryAgainButton).toBeInTheDocument();
    expect(goHomeButton).toBeInTheDocument();
  });
});
