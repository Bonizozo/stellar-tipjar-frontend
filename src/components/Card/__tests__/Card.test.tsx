import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from '../index'

describe('Card Component', () => {
  const user = userEvent.setup()

  it('renders with default variant', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'shadow-md')
  })

  it('renders with elevated variant', () => {
    render(<Card variant="elevated">Elevated card</Card>)
    const card = screen.getByText('Elevated card')
    
    expect(card).toHaveClass('shadow-xl')
  })

  it('renders with outlined variant', () => {
    render(<Card variant="outlined">Outlined card</Card>)
    const card = screen.getByText('Outlined card')
    
    expect(card).toHaveClass('border-2', 'border-gray-200')
  })

  it('renders with glass variant', () => {
    render(<Card variant="glass">Glass card</Card>)
    const card = screen.getByText('Glass card')
    
    expect(card).toHaveClass('backdrop-blur-lg', 'bg-white/80')
  })

  it('applies hover effects correctly', () => {
    render(<Card hoverEffect="lift">Hover card</Card>)
    const card = screen.getByText('Hover card')
    
    expect(card).toHaveClass('hover:-translate-y-1', 'hover:shadow-xl')
  })

  it('applies glow hover effect', () => {
    render(<Card hoverEffect="glow">Glow card</Card>)
    const card = screen.getByText('Glow card')
    
    expect(card).toHaveClass('hover:shadow-2xl', 'hover:shadow-purple-500/10')
  })

  it('applies border hover effect', () => {
    render(<Card hoverEffect="border">Border card</Card>)
    const card = screen.getByText('Border card')
    
    expect(card).toHaveClass('hover:border-purple-400')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Card size="sm">Small card</Card>)
    expect(screen.getByText('Small card')).toHaveClass('p-4', 'rounded-xl')

    rerender(<Card size="md">Medium card</Card>)
    expect(screen.getByText('Medium card')).toHaveClass('p-6', 'rounded-2xl')

    rerender(<Card size="lg">Large card</Card>)
    expect(screen.getByText('Large card')).toHaveClass('p-8', 'rounded-3xl')
  })

  it('handles click events when hoverable', async () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick} hoverable>Clickable card</Card>)
    
    const card = screen.getByText('Clickable card')
    expect(card).toHaveClass('cursor-pointer')
    
    await user.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading skeleton when loading', () => {
    render(<Card loading>Content</Card>)
    
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    const card = screen.getByText('Custom card')
    
    expect(card).toHaveClass('custom-class')
  })

  it('forwards additional props', () => {
    render(<Card data-testid="custom-card">Test card</Card>)
    const card = screen.getByTestId('custom-card')
    
    expect(card).toBeInTheDocument()
  })

  it('has proper accessibility attributes when clickable', () => {
    render(<Card onClick={() => {}} role="button">Accessible card</Card>)
    const card = screen.getByRole('button')
    
    expect(card).toBeInTheDocument()
  })
})