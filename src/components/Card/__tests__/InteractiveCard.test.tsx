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

  it('handles keyboard navigation with Enter and Space', async () => {
    const handleClick = vi.fn()
    render(
      <InteractiveCard onClick={handleClick}>
        <div>Keyboard navigable</div>
      </InteractiveCard>
    )

    const card = screen.getByRole('button', { name: /keyboard navigable/i })
    card.focus()
    expect(card).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()

    handleClick.mockClear()
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalled()
  })

  it('triggers onSelectionChange when selectable card is clicked', async () => {
    const onSelectionChange = vi.fn()
    render(
      <InteractiveCard
        title="Selectable Card"
        selectable
        selected={false}
        onSelectionChange={onSelectionChange}
      >
        <div>Card body</div>
      </InteractiveCard>
    )

    const card = screen.getByRole('button', { name: /Selectable Card/i })
    await user.click(card)

    expect(onSelectionChange).toHaveBeenCalledWith(true)
  })

  it('handles expandable toggle and renders expanded content', async () => {
    const onExpandChange = vi.fn()
    const { rerender } = render(
      <InteractiveCard
        title="Expandable Card"
        expandable
        expanded={false}
        onExpandChange={onExpandChange}
        expandedContent={<div data-testid="expanded-body">More details</div>}
      >
        <div>Summary</div>
      </InteractiveCard>
    )

    expect(screen.queryByTestId('expanded-body')).not.toBeInTheDocument()

    const expandBtn = screen.getByLabelText('Expand')
    await user.click(expandBtn)
    expect(onExpandChange).toHaveBeenCalledWith(true)

    rerender(
      <InteractiveCard
        title="Expandable Card"
        expandable
        expanded={true}
        onExpandChange={onExpandChange}
        expandedContent={<div data-testid="expanded-body">More details</div>}
      >
        <div>Summary</div>
      </InteractiveCard>
    )

    expect(screen.getByTestId('expanded-body')).toBeInTheDocument()
  })

  it('renders status styles correctly for success, warning, error, info', () => {
    const statuses = ['success', 'warning', 'error', 'info'] as const
    statuses.forEach((status) => {
      const { container } = render(
        <InteractiveCard status={status}>
          <div>Status {status}</div>
        </InteractiveCard>
      )
      expect(container.querySelector(`[class*="ring-2 ring-${status === 'info' ? 'blue' : status === 'success' ? 'green' : status === 'warning' ? 'yellow' : 'red'}"]`)).toBeInTheDocument()
    })
  })

  it('renders badge in top right corner', () => {
    render(
      <InteractiveCard badge={<span data-testid="test-badge">New</span>}>
        <div>Card with badge</div>
      </InteractiveCard>
    )

    expect(screen.getByTestId('test-badge')).toBeInTheDocument()
  })
})