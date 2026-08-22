import { render, screen } from '@testing-library/react'
import { SectionCard } from '../SectionCard'

describe('SectionCard Component', () => {
  const mockIcon = <svg data-testid="test-icon" />

  it('renders title and description correctly', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders icon correctly', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('has correct semantic structure', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    const card = screen.getByRole('article')
    expect(card).toBeInTheDocument()

    const heading = screen.getByRole('heading', { name: 'Test Title', level: 3 })
    expect(heading).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    const card = screen.getByRole('article')
    expect(card).toHaveClass(
      'rounded-2xl',
      'bg-white',
      'dark:bg-gray-800',
      'shadow-md'
    )
  })

  it('renders icon container with correct classes', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    const iconContainer = screen.getByTestId('test-icon').parentElement
    expect(iconContainer).toHaveClass(
      'inline-flex',
      'h-10',
      'w-10',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-wave/10',
      'text-wave'
    )
  })

  it('renders title with correct styling', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    const heading = screen.getByRole('heading', { name: 'Test Title', level: 3 })
    expect(heading).toHaveClass(
      'text-lg',
      'font-semibold',
      'text-ink'
    )
  })

  it('renders description with correct styling', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
      />
    )

    const description = screen.getByText('Test description')
    expect(description).toHaveClass(
      'text-sm',
      'text-ink/70'
    )
  })

  it('handles complex icon components', () => {
    const complexIcon = (
      <div>
        <span>Icon</span>
        <svg data-testid="complex-icon" />
      </div>
    )

    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={complexIcon}
      />
    )

    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByTestId('complex-icon')).toBeInTheDocument()
  })

  it('handles empty description', () => {
    render(
      <SectionCard
        title="Test Title"
        description=""
        icon={mockIcon}
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    // Check that the description paragraph exists but is empty
    const descriptionParagraph = screen.getByRole('heading', { name: 'Test Title' }).nextElementSibling
    expect(descriptionParagraph).toHaveTextContent('')
  })

  it('handles long title and description', () => {
    const longTitle = 'This is a very long title that should still render correctly without any issues'
    const longDescription = 'This is a very long description that should wrap properly and still maintain all the styling classes and accessibility features'

    render(
      <SectionCard
        title={longTitle}
        description={longDescription}
        icon={mockIcon}
      />
    )

    expect(screen.getByText(longTitle)).toBeInTheDocument()
    expect(screen.getByText(longDescription)).toBeInTheDocument()
  })

  it('supports different card variants', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
        variant="elevated"
      />
    )

    const card = screen.getByRole('article')
    expect(card).toHaveClass('shadow-xl')
  })

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn()
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        icon={mockIcon}
        onClick={handleClick}
      />
    )

    const card = screen.getByRole('article')
    card.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders image URL correctly', () => {
    render(
      <SectionCard
        title="Test Title"
        description="Test description"
        imageUrl="/test-image.jpg"
      />
    )

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test Title')
  })
})
