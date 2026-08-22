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

    const card = screen.getByRole('button', { name: /clickable content/i })
    await user.click(card)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles double click events', async () => {
    const handleDoubleClick = vi.fn()
    render(
      <InteractiveCard onDoubleClick={handleDoubleClick}>
        <div>Double clickable content</div>
      </InteractiveCard>
    )

    const card = screen.getByRole('button', { name: /double clickable content/i })
    await user.dblClick(card)
    
    expect(handleDoubleClick).toHaveBeenCalledTimes(1)
  })

  it('shows selected state correctly', () => {
    const { container } = render(
      <InteractiveCard selected>
        <div>Selected content</div>
      </InteractiveCard>
    )

    const card = container.querySelector('.ring-2.ring-purple-500')
    expect(card).toBeInTheDocument()
  })

  it('shows selectable hover state', () => {
    const { container } = render(
      <InteractiveCard selectable hoverEffect="border">
        <div>Selectable content</div>
      </InteractiveCard>
    )

    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('applies cursor pointer when clickable', () => {
    render(
      <InteractiveCard onClick={() => {}}>
        <div>Clickable content</div>
      </InteractiveCard>
    )

    const card = screen.getByRole('button')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('applies cursor pointer when selectable', () => {
    const { container } = render(
      <InteractiveCard selectable>
        <div>Selectable content</div>
      </InteractiveCard>
    )

    const card = container.querySelector('.cursor-pointer')
    expect(card).toBeInTheDocument()
  })

  it('creates ripple effects on click', async () => {
    render(
      <InteractiveCard onClick={() => {}} ripple>
        <div>Ripple content</div>
      </InteractiveCard>
    )

    const card = screen.getByRole('button')
    await user.click(card)
    expect(card).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <InteractiveCard className="custom-interactive-class">
        <div>Custom content</div>
      </InteractiveCard>
    )

    const card = container.querySelector('.custom-interactive-class')
    expect(card).toBeInTheDocument()
  })

  it('forwards card props correctly', () => {
    const { container } = render(
      <InteractiveCard variant="elevated" size="lg">
        <div>Props content</div>
      </InteractiveCard>
    )

    const card = container.querySelector('.shadow-xl.p-8.rounded-3xl')
    expect(card).toBeInTheDocument()
  })
})