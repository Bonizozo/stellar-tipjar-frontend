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

// Mock WebSocketContext
vi.mock('@/contexts/WebSocketContext', () => ({
  useWebSocketContext: () => ({
    notifications: [],
    unreadCount: 0,
    markAllRead: vi.fn(),
    clearNotifications: vi.fn(),
    isMuted: false,
    setMuted: vi.fn(),
    connectionStatus: 'connected',
  }),
  WebSocketProvider: ({ children }: { children: React.ReactNode }) => children,
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

    const brandLink = screen.getByRole('link', { name: /Stellar Tip Jar/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders all navigation links', () => {
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

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('applies correct styling classes to header', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-20',
      'transition-shadow'
    )
  })

  it('applies correct styling classes to navigation container', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
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

    const brandLink = screen.getByRole('link', { name: /Stellar Tip Jar/i })
    expect(brandLink).toHaveClass(
      'shrink-0',
      'text-lg',
      'font-bold',
      'tracking-tight'
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

  it('renders responsive design classes', () => {
    renderNavbar()

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

    const brandLink = screen.getByRole('link', { name: /Stellar Tip Jar/i })
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

    expect(() => renderNavbar(<Navbar />)).not.toThrow()
  })
})
