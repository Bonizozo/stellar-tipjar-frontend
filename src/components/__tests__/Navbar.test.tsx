import { render, screen, within } from '@testing-library/react'
import { Navbar } from '../Navbar'
import { WalletConnector } from '../WalletConnector'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { WalletProvider } from '@/contexts/WalletContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      brandName: 'Stellar Tip Jar',
    };
    return map[key] || key;
  },
  useLocale: () => 'en',
}));

vi.mock('../NotificationBadge', () => ({
  NotificationBadge: vi.fn(() => <div data-testid="notification-badge" />),
}))

vi.mock('../NotificationCenter', () => ({
  NotificationCenter: vi.fn(() => <div data-testid="notification-center" />),
}))


vi.mock('../NotificationBadge', () => ({
  NotificationBadge: () => <div data-testid="notification-badge" />,
}))

vi.mock('../NotificationCenter', () => ({
  NotificationCenter: () => <div data-testid="notification-center" />,
}))

// Mock WalletConnector component
vi.mock('../WalletConnector', () => ({
  WalletConnector: vi.fn(() => <div data-testid="wallet-connector">Wallet Connector</div>)
}))

// Mock NotificationBadge component
vi.mock('../NotificationBadge', () => ({
  NotificationBadge: vi.fn(() => <div data-testid="notification-badge">Badge</div>)
}))

const mockWalletConnector = vi.mocked(WalletConnector)

const renderNavbar = (ui: React.ReactElement = <Navbar />) =>
  render(
    <CurrencyProvider>
      <WalletProvider>{ui}</WalletProvider>
    </CurrencyProvider>
  )

const getMainNav = () => screen.getByRole('navigation', { name: /main navigation/i })

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders brand link with correct text', () => {
    renderNavbar()

    const brandLink = screen.getByRole('link', { name: /Stellar Tip Jar/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders primary navigation items', () => {
    renderNavbar()
    const mainNav = getMainNav()

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Explore' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tips' })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderNavbar()
    const mainNav = getMainNav()

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('button', { name: 'Explore' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tips' })).toHaveAttribute('href', '/tips')
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

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('applies current header styling classes', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-20', 'border-b', 'border-transparent', 'bg-white/70', 'backdrop-blur-md')
  })

  it('applies current navigation container classes', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toHaveClass('mx-auto', 'flex', 'h-16', 'w-full', 'max-w-7xl', 'items-center', 'justify-between', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('brand link has current styling', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: /Stellar Tip Jar/i })).toHaveClass(
      'shrink-0',
      'text-lg',
      'font-bold',
      'tracking-tight',
      'text-gray-900'
    )
  })

  it('navigation links container has correct styling', () => {
    renderNavbar()

    const navLinksContainer = screen.getByRole('link', { name: 'Tips' }).closest('ul')
    expect(navLinksContainer).toHaveClass(
      'hidden',
      'items-center',
      'gap-6',

      'md:flex'
    )
  })

  it('navigation links have correct styling', () => {
    renderNavbar()

    const homeLink = screen.getByRole('link', { name: 'Tips' })
    expect(homeLink).toHaveClass(
      'transition-colors',
      'hover:text-purple-600'
    )
  })

  it('renders responsive design classes', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar — home' })
    expect(brandLink).toHaveClass('text-lg')

    const navLinksContainer = screen.getByRole('link', { name: 'Tips' }).closest('ul')
    expect(navLinksContainer).toHaveClass('hidden', 'md:flex')
  })

  it('has correct accessibility attributes', () => {
    renderNavbar()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => renderNavbar()).not.toThrow()
  })
})
