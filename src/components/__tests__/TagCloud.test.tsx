import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagCloud } from '../TagCloud';

const mockTags = [
  { tag: 'web3', count: 45 },
  { tag: 'nft', count: 38 },
];

describe('TagCloud', () => {
  it('renders tags with sizes based on count', () => {
    const onTagClick = vi.fn();
    render(<TagCloud tags={mockTags} onTagClick={onTagClick} />);
    expect(screen.getByText('web3')).toBeInTheDocument();
    expect(screen.getByText('nft')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /web3/i })).toHaveClass('text-lg font-semibold');
  });

  it('calls onTagClick on tag click', () => {
    const onTagClick = vi.fn();
    render(<TagCloud tags={mockTags} onTagClick={onTagClick} />);
    fireEvent.click(screen.getByRole('button', { name: /web3/i }));
    expect(onTagClick).toHaveBeenCalledWith('web3');
  });

  it('shows no tags message when empty', () => {
    render(<TagCloud tags={[]} onTagClick={() => {}} />);
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
  });
});

