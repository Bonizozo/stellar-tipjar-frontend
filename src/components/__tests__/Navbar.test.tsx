import { render, screen, within } from '@testing-library/react'
import { Navbar } from '../Navbar'
import { WalletConnector } from '../WalletConnector'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { WalletProvider } from '@/contexts/WalletContext'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next-intl', () => ({
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

    expect(within(mainNav).getByRole('button', { name: 'Explore' })).toBeInTheDocument()
    expect(within(mainNav).getByRole('link', { name: 'Tips' })).toBeInTheDocument()
    expect(within(mainNav).getByRole('link', { name: 'Widgets' })).toBeInTheDocument()
    expect(within(mainNav).getByRole('link', { name: 'Help' })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderNavbar()
    const mainNav = getMainNav()

    expect(within(mainNav).getByRole('link', { name: 'Tips' })).toHaveAttribute('href', '/tips')
    expect(within(mainNav).getByRole('link', { name: 'Widgets' })).toHaveAttribute('href', '/widgets')
    expect(within(mainNav).getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/help')
  })

  it('renders WalletConnector component', () => {
    renderNavbar()

    expect(screen.getByTestId('wallet-connector')).toBeInTheDocument()
    expect(mockWalletConnector).toHaveBeenCalled()
  })

  it('has correct semantic structure', () => {
    renderNavbar()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(getMainNav()).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /quick actions/i })).toBeInTheDocument()
  })

  it('applies current header styling classes', () => {
    renderNavbar()

    expect(screen.getByRole('banner')).toHaveClass(
      'sticky',
      'top-0',
      'z-20',
      'transition-shadow',
      'backdrop-blur-md'
    )
  })

  it('applies current navigation container classes', () => {
    renderNavbar()

    expect(getMainNav()).toHaveClass(
      'mx-auto',
      'flex',
      'h-16',
      'w-full',
      'max-w-7xl',
      'items-center',
      'justify-between'
    )
  })

  it('brand link has current styling', () => {
    renderNavbar()

    expect(screen.getByRole('link', { name: /Stellar Tip Jar/i })).toHaveClass(
      'shrink-0',
      'text-lg',
      'font-bold',
      'tracking-tight'
    )
  })

  it('navigation links container has responsive styling', () => {
    renderNavbar()

    const linksList = within(getMainNav()).getByRole('list')
    expect(linksList).toHaveClass('hidden', 'items-center', 'gap-6', 'md:flex')
  })

  it('navigation links have current styling', () => {
    renderNavbar()

    expect(within(getMainNav()).getByRole('link', { name: 'Tips' })).toHaveClass(
      'text-sm',
      'font-medium',
      'transition-colors'
    )
  })

  it('renders responsive controls', () => {
    renderNavbar()

    expect(getMainNav()).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    expect(screen.getByRole('button', { name: /open mobile menu/i })).toHaveClass('md:hidden')
  })

  it('has correct accessibility attributes', () => {
    renderNavbar()

    expect(getMainNav()).toHaveAttribute('aria-label', 'Main navigation')
    expect(screen.getByRole('button', { name: 'Explore' })).toHaveAttribute('aria-haspopup', 'true')
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => renderNavbar()).not.toThrow()
  })
})
