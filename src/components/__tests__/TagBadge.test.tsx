import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TagBadge } from '../TagBadge';

describe('TagBadge', () => {
  it('renders tag with default props', () => {
    render(<TagBadge tag="web3" />);
    expect(screen.getByText('web3')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
  });

  it('renders with size sm', () => {
    render(<TagBadge tag="nft" size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('px-2 py-1 text-xs');
  });

  it('renders category variant', () => {
    render(<TagBadge tag="art" variant="category" />);
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r from-indigo-500/10 to-purple-500/10');
  });

  it('is accessible', () => {
    render(<TagBadge tag="defi" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', expect.stringContaining('tag'));
  });
});

