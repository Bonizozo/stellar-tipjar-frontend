import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagCloud } from '../TagCloud';

const mockTags = [
  { tag: 'web3', count: 45 },
  { tag: 'nft', count: 38 },
  { tag: 'defi', count: 32 },
  { tag: 'dao', count: 28 },
];

describe('TagCloud', () => {
  it('renders tags with counts', () => {
    render(<TagCloud tags={mockTags} />);
    
    expect(screen.getByText('Popular Tags')).toBeInTheDocument();
    expect(screen.getByText('#web3')).toBeInTheDocument();
    expect(screen.getByText('#nft')).toBeInTheDocument();
  });

  it('limits visible tags by maxVisible prop', () => {
    render(<TagCloud tags={mockTags} maxVisible={2} />);
    
    expect(screen.getByText('#web3')).toBeInTheDocument();
    expect(screen.getByText('#nft')).toBeInTheDocument();
    expect(screen.queryByText('#defi')).not.toBeInTheDocument();
    
    // Should show "Show all" button
    expect(screen.getByText('Show all 4')).toBeInTheDocument();
  });

  it('expands to show all tags when "Show all" is clicked', () => {
    render(<TagCloud tags={mockTags} maxVisible={2} />);
    
    const showAllButton = screen.getByText('Show all 4');
    fireEvent.click(showAllButton);
    
    expect(screen.getByText('#defi')).toBeInTheDocument();
    expect(screen.getByText('#dao')).toBeInTheDocument();
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('calls onTagClick when tag is clicked', () => {
    const onTagClick = vi.fn();
    render(<TagCloud tags={mockTags} onTagClick={onTagClick} />);
    
    const web3Tag = screen.getByText('#web3');
    fireEvent.click(web3Tag);
    
    expect(onTagClick).toHaveBeenCalledWith('web3');
  });

  it('renders empty state when no tags', () => {
    render(<TagCloud tags={[]} />);
    
    expect(screen.getByText('Popular Tags')).toBeInTheDocument();
    // Should not show any tags or show all button
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TagCloud tags={mockTags} className="custom-class" />);
    
    const container = screen.getByText('Popular Tags').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('does not show expand/collapse when tags fit in maxVisible', () => {
    render(<TagCloud tags={mockTags.slice(0, 2)} maxVisible={5} />);
    
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });
});

