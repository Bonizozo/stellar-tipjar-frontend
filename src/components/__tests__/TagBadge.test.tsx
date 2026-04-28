import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagBadge } from '../TagBadge';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('TagBadge', () => {
  it('renders tag with default props', () => {
    render(<TagBadge tag="web3" />);
    expect(screen.getByText('#web3')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<TagBadge tag="nft" size="sm" />);
    expect(screen.getByText('#nft')).toHaveClass('px-2', 'py-1', 'text-xs');

    rerender(<TagBadge tag="nft" size="md" />);
    expect(screen.getByText('#nft')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<TagBadge tag="nft" size="lg" />);
    expect(screen.getByText('#nft')).toHaveClass('px-4', 'py-2', 'text-base');
  });

  it('handles click when clickable', () => {
    const onClick = vi.fn();
    render(<TagBadge tag="defi" clickable onClick={onClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onClick).toHaveBeenCalledWith('defi');
  });

  it('copies tag to clipboard on mouse down', async () => {
    render(<TagBadge tag="web3" />);
    
    const element = screen.getByText('#web3');
    fireEvent.mouseDown(element);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('web3');
  });

  it('shows copy feedback', async () => {
    render(<TagBadge tag="nft" />);
    
    const element = screen.getByText('#nft');
    fireEvent.mouseDown(element);
    
    // Should show checkmark icon after copy
    await screen.findByRole('img', { hidden: true });
  });

  it('has proper accessibility attributes', () => {
    render(<TagBadge tag="defi" clickable />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('defi'));
    expect(button).toHaveAttribute('title', 'Copy tag: #defi');
  });

  it('applies custom className', () => {
    render(<TagBadge tag="crypto" className="custom-class" />);
    
    expect(screen.getByText('#crypto')).toHaveClass('custom-class');
  });
});

