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
  useLocale: () => 'en',
}));

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

  it('renders all navigation items', () => {
    renderNavbar()

    expect(screen.getByRole('button', { name: /Explore/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Tips/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Widgets/i })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderNavbar()

    expect(screen.getAllByRole('link', { name: /Stellar Tip Jar/i })[0]).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /Tips/i, hidden: true })).toHaveAttribute('href', '/tips')
    expect(screen.getByRole('link', { name: /Widgets/i, hidden: true })).toHaveAttribute('href', '/widgets')
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

    const navs = screen.getAllByRole('navigation')
    expect(navs.length).toBeGreaterThan(0)
  })

  it('applies correct styling classes to header', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-20',
      'transition-shadow',
      'border-b',
      'backdrop-blur-md'
    )
  })

  it('applies correct styling classes to main navigation container', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: /Main navigation/i })
    expect(nav).toHaveClass(
      'mx-auto',
      'flex',
      'w-full',
      'max-w-7xl',
      'items-center',
      'justify-between',
      'gap-4',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    )
  })

  it('brand link has correct styling', () => {
    renderNavbar()

    const brandLink = screen.getByRole('link', { name: /Stellar Tip Jar/i })
    expect(brandLink).toHaveClass(
      'text-lg',
      'font-bold',
      'tracking-tight'
    )
  })

  it('navigation links container has correct styling', () => {
    renderNavbar()

    const list = screen.getByRole('list')
    expect(list).toHaveClass(
      'hidden',
      'items-center',
      'gap-6',
      'md:flex'
    )
  })

  it('navigation links have correct styling', () => {
    renderNavbar()

    const tipsLink = screen.getByRole('link', { name: 'Tips' })
    expect(tipsLink).toHaveClass(
      'transition-colors',
      'hover:text-purple-600'
    )
  })

  it('renders responsive design classes', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: /Main navigation/i })
    expect(nav).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

    const list = screen.getByRole('list')
    expect(list).toHaveClass('hidden', 'md:flex')
  })

  it('has correct accessibility attributes', () => {
    renderNavbar()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /Main navigation/i })).toBeInTheDocument()
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => renderNavbar()).not.toThrow()
  })
})
