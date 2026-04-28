import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InteractiveCard } from '../InteractiveCard'

describe('InteractiveCard Component', () => {
  const user = userEvent.setup()

  it('renders content correctly', () => {
    render(
      <InteractiveCard>
        <div>Interactive content</div>
      </InteractiveCard>
    )

    expect(screen.getByText('Interactive content')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(
      <InteractiveCard onClick={handleClick}>
        <div>Clickable content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Clickable content').closest('div')
    await user.click(card!)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles double click events', async () => {
    const handleDoubleClick = vi.fn()
    render(
      <InteractiveCard onDoubleClick={handleDoubleClick}>
        <div>Double clickable content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Double clickable content').closest('div')
    await user.dblClick(card!)
    
    expect(handleDoubleClick).toHaveBeenCalledTimes(1)
  })

  it('shows selected state correctly', () => {
    render(
      <InteractiveCard selected>
        <div>Selected content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Selected content').closest('div')
    expect(card).toHaveClass('ring-2', 'ring-purple-500')
  })

  it('shows selectable hover state', () => {
    render(
      <InteractiveCard selectable>
        <div>Selectable content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Selectable content').closest('div')
    expect(card).toHaveClass('hover:ring-2', 'hover:ring-purple-300')
  })

  it('applies cursor pointer when clickable', () => {
    render(
      <InteractiveCard onClick={() => {}}>
        <div>Clickable content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Clickable content').closest('div')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('applies cursor pointer when selectable', () => {
    render(
      <InteractiveCard selectable>
        <div>Selectable content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Selectable content').closest('div')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('creates ripple effects on click', async () => {
    render(
      <InteractiveCard onClick={() => {}} ripple>
        <div>Ripple content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Ripple content').closest('div')
    await user.click(card!)
    
    // Check if ripple element is created (it has specific styling)
    const rippleElement = document.querySelector('.bg-purple-400\\/30')
    expect(rippleElement).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <InteractiveCard className="custom-interactive-class">
        <div>Custom content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Custom content').closest('div')
    expect(card).toHaveClass('custom-interactive-class')
  })

  it('forwards card props correctly', () => {
    render(
      <InteractiveCard variant="elevated" size="lg">
        <div>Props content</div>
      </InteractiveCard>
    )

    const card = screen.getByText('Props content').closest('div')
    expect(card).toHaveClass('shadow-xl', 'p-8', 'rounded-3xl')
  })
})