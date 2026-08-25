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

// Mock NotificationBadge component
vi.mock('../NotificationBadge', () => ({
  NotificationBadge: vi.fn(() => <div data-testid="notification-badge">Badge</div>),
}));

// Mock NotificationCenter component
vi.mock('../NotificationCenter', () => ({
  NotificationCenter: vi.fn(() => <div data-testid="notification-center">Center</div>),
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

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar — home' })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders all desktop navigation items', () => {
    renderNavbar()

    expect(screen.getByRole('button', { name: /Explore/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tips' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Widgets' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: 'Tips' })).toHaveAttribute('href', '/tips')
    expect(screen.getByRole('link', { name: 'Widgets' })).toHaveAttribute('href', '/widgets')
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/help')
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

    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
  })

  it('applies correct styling classes to header', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-20'
    )
  })

  it('applies correct styling classes to main navigation container', () => {
    renderNavbar()

    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toHaveClass(
      'mx-auto',
      'flex',
      'h-16',
      'w-full',
      'max-w-7xl',
      'items-center',
      'justify-between',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    )
  })

  it('brand link has correct styling', () => {
    renderNavbar()

    const brandLink = screen.getByRole('link', { name: 'Stellar Tip Jar — home' })
    expect(brandLink).toHaveClass(
      'text-lg',
      'font-bold',
      'tracking-tight'
    )
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => renderNavbar(<Navbar />)).not.toThrow()
  })
})
