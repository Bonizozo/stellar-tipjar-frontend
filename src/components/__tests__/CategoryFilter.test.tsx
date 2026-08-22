import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from '../CategoryFilter';
import { CATEGORIES } from '@/utils/categories';

describe('CategoryFilter', () => {
  it('renders with default state', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={[]} onChange={onChange} />);
    
    // Should show "All" when no categories selected
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={[]} onChange={onChange} />);
    
    const button = screen.getByRole('button', { name: /filter by categories/i });
    fireEvent.click(button);
    
    // Should show all categories in dropdown
    CATEGORIES.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('toggles category selection', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={[]} onChange={onChange} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /filter by categories/i }));
    
    // Click on a category
    const artCheckbox = screen.getByRole('checkbox', { name: /art/i });
    fireEvent.click(artCheckbox);
    
    expect(onChange).toHaveBeenCalledWith(['art']);
  });

  it('shows selected count', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={['art', 'tech']} onChange={onChange} />);
    
    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('removes category when already selected', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={['art']} onChange={onChange} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /filter by categories/i }));
    
    // Click on already selected category
    const artCheckbox = screen.getByRole('checkbox', { name: /art/i });
    fireEvent.click(artCheckbox);
    
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows visual indication for selected categories', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={['art']} onChange={onChange} />);
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /filter by categories/i }));
    
    const artCheckbox = screen.getByRole('checkbox', { name: /art/i });
    expect(artCheckbox).toHaveAttribute('aria-checked', 'true');
  });
});

