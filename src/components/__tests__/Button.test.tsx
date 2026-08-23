import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button Component', () => {
  const user = userEvent.setup()

  it('renders with default primary variant', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-purple-600', 'text-white')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: 'Secondary' })
    
    expect(button).toHaveClass('bg-gray-200', 'text-gray-900')
  })

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole('button', { name: 'Ghost' })
    
    expect(button).toHaveClass('hover:bg-gray-100')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button', { name: 'Custom' })
    
    expect(button).toHaveClass('custom-class')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: 'Disabled' })
    
    expect(button).toBeDisabled()
  })

  it('renders with custom type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button', { name: 'Submit' })
    
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('forwards additional props', () => {
    render(<Button data-testid="custom-button">Test</Button>)
    const button = screen.getByTestId('custom-button')
    
    expect(button).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Button aria-label="Custom label">Button</Button>)
    const button = screen.getByRole('button', { name: 'Custom label' })
    
    expect(button).toHaveAttribute('aria-label', 'Custom label')
  })

  it('renders children correctly', () => {
    render(
      <Button>
        <span data-testid="child-element">Child Content</span>
      </Button>
    )
    
    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
