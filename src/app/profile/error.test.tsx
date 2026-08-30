import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('ProfileError boundary', () => {
  const mockError = new Error('Failed to update profile') as Error & { digest?: string };
  mockError.digest = 'profile123error456';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button as secondary action', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('renders both action buttons', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  it('shows dev-only error digest in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(<ProfileError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(new RegExp(mockError.digest!))).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });

  it('shows error description', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/refresh the page/i)).toBeInTheDocument();
  });

  it('displays error icon/emoji', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const warningIcon = alert.querySelector('svg');
    expect(warningIcon).toBeInTheDocument();
  });

  it('buttons are keyboard accessible', () => {
    render(<ProfileError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    expect(tryAgainButton.tagName).toBe('BUTTON');
    expect(tryAgainButton).not.toBeDisabled();
  });
});
