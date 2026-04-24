import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from '../CategoryFilter';

const categories = ['art', 'tech', 'community'];

describe('CategoryFilter', () => {
  it('renders all categories', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={[]} onChange={onChange} categories={categories} />);
    expect(screen.getByText('art')).toBeInTheDocument();
    expect(screen.getByText('tech')).toBeInTheDocument();
  });

  it('toggles category selection', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={[]} onChange={onChange} categories={categories} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /art/i }));
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['art']));
  });

  it('shows selected count', () => {
    render(<CategoryFilter selectedCategories={['art', 'tech']} onChange={() => {}} categories={categories} />);
    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('handles clear all', () => {
    const onChange = vi.fn();
    render(<CategoryFilter selectedCategories={['art']} onChange={onChange} categories={categories} />);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});

