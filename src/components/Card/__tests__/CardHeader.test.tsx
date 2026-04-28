import { render, screen } from '@testing-library/react'
import { CardHeader } from '../CardHeader'

describe('CardHeader Component', () => {
  it('renders title and subtitle correctly', () => {
    render(
      <CardHeader 
        title="Card Title" 
        subtitle="Card Subtitle" 
      />
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
  })

  it('renders icon correctly', () => {
    const icon = <svg data-testid="test-icon" />
    render(
      <CardHeader 
        title="Card Title" 
        icon={icon}
      />
    )

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders avatar correctly', () => {
    const avatar = <img data-testid="test-avatar" src="/avatar.jpg" alt="Avatar" />
    render(
      <CardHeader 
        title="Card Title" 
        avatar={avatar}
      />
    )

    expect(screen.getByTestId('test-avatar')).toBeInTheDocument()
  })

  it('renders actions correctly', () => {
    const actions = <button data-testid="action-button">Action</button>
    render(
      <CardHeader 
        title="Card Title" 
        actions={actions}
      />
    )

    expect(screen.getByTestId('action-button')).toBeInTheDocument()
  })

  it('renders custom children when provided', () => {
    render(
      <CardHeader>
        <div data-testid="custom-content">Custom Content</div>
      </CardHeader>
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <CardHeader 
        title="Card Title" 
        className="custom-header-class"
      />
    )

    const header = screen.getByText('Card Title').closest('div')
    expect(header).toHaveClass('custom-header-class')
  })

  it('handles long titles with truncation', () => {
    const longTitle = 'This is a very long title that should be truncated'
    render(
      <CardHeader title={longTitle} />
    )

    const titleElement = screen.getByText(longTitle)
    expect(titleElement).toHaveClass('truncate')
  })

  it('handles missing title gracefully', () => {
    render(
      <CardHeader subtitle="Only subtitle" />
    )

    expect(screen.getByText('Only subtitle')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})