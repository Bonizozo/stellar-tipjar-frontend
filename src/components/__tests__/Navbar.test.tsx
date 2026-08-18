import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'
import { WalletConnector } from '../WalletConnector'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { WalletProvider } from '@/contexts/WalletContext'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      brandName: 'Stellar Tip Jar',
    };
    return map[key] || key;
  },
}));

// Mock WalletConnector component
vi.mock('../WalletConnector', () => ({
  WalletConnector: vi.fn(() => <div data-testid="wallet-connector">Wallet Connector</div>)
}))

const mockWalletConnector = vi.mocked(WalletConnector)

const renderNavbar = (ui: React.ReactElement = <Navbar />) =>
  render(
    <CurrencyProvider>
      <WalletProvider>{ui}</WalletProvider>
    </CurrencyProvider>
  )

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders brand link with correct text', () => {
    renderNavbar()

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar' })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders all navigation links', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore Creators' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Send Tips' })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Explore Creators' })).toHaveAttribute('href', '/explore')
    expect(screen.getByRole('link', { name: 'Send Tips' })).toHaveAttribute('href', '/tips')
  })

  it('renders WalletConnector component', () => {
    renderNavbar()

    expect(screen.getByTestId('wallet-connector')).toBeInTheDocument()
    expect(mockWalletConnector).toHaveBeenCalled()
  })

  it('has correct semantic structure', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('applies correct styling classes to header', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-20',
      'border-b',
      'border-ink/10',
      'bg-[color:var(--surface)]/80',
      'backdrop-blur-md'
    )
  })

  it('applies correct styling classes to navigation container', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass(
      'mx-auto',
      'flex',
      'w-full',
      'max-w-6xl',
      'items-center',
      'justify-between',
      'px-4',
      'py-4',
      'sm:px-6',
      'lg:px-8'
    )
  })

  it('brand link has correct styling', () => {
    renderNavbar()

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar' })
    expect(brandLink).toHaveClass(
      'text-lg',
      'font-bold',
      'tracking-tight',
      'text-ink',
      'sm:text-xl'
    )
  })

  it('navigation links container has correct styling', () => {
    renderNavbar()

    const navLinksContainer = screen.getByRole('link', { name: 'Home' }).parentElement
    expect(navLinksContainer).toHaveClass(
      'hidden',
      'items-center',
      'gap-6',
      'text-sm',
      'font-medium',
      'text-ink/80',
      'md:flex'
    )
  })

  it('navigation links have correct styling', () => {
    renderNavbar()

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveClass(
      'transition-colors',
      'hover:text-wave'
    )
  })

  it('renders responsive design classes', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar' })
    expect(brandLink).toHaveClass('text-lg', 'sm:text-xl')

    const navLinksContainer = screen.getByRole('link', { name: 'Home' }).parentElement
    expect(navLinksContainer).toHaveClass('hidden', 'md:flex')
  })

  it('has correct accessibility attributes', () => {
    renderNavbar()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => render(<Navbar />)).not.toThrow()
  })
})
