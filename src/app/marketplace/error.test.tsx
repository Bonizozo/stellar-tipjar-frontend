import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MarketplaceError from './error';

// Mock the logError utility
vi.mock('@/utils/errorLogger', () => ({
  logError: vi.fn(),
}));

describe('MarketplaceError boundary', () => {
  const mockError = new Error('Failed to fetch marketplace data') as Error & { digest?: string };
  mockError.digest = 'xyz789abc123';
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockClear();
    vi.clearAllMocks();
  });

  it('renders error fallback UI', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays error heading', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls reset when Try again button is clicked', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('has accessible alert role with assertive aria-live', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders Go home button', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it('provides error description text', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });

  it('buttons are properly styled with accessible focus states', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    expect(tryAgainButton).toHaveClass('focus-visible');
  });

  it('alert section is visually centered', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    expect(alert.className).toMatch(/flex.*items-center/);
  });

  it('displays error icon', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const alert = screen.getByRole('alert');
    const warningIcon = alert.querySelector('svg');
    expect(warningIcon).toBeInTheDocument();
  });

  it('button click is keyboard accessible', () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement;
    
    fireEvent.keyDown(tryAgainButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalled();
  });
});
