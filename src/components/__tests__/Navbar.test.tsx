import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../../../messages/en.json'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { WebSocketProvider } from '@/contexts/WebSocketContext'
import { Navbar } from '../Navbar'
import { WalletConnector } from '../WalletConnector'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// Mock WalletConnector component
vi.mock('../WalletConnector', () => ({
  WalletConnector: vi.fn(() => <div data-testid="wallet-connector">Wallet Connector</div>)
}))

const mockWalletConnector = vi.mocked(WalletConnector)

const renderWithProviders = (ui: React.ReactElement = <Navbar />) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider>
        <ToastProvider>
          <WebSocketProvider>
            <CurrencyProvider>
              <WalletProvider>
                {ui}
              </WalletProvider>
            </CurrencyProvider>
          </WebSocketProvider>
        </ToastProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders brand link with correct text', () => {
    renderWithProviders()

    const brandLink = screen.getByRole('link', { name: /stellar tip jar/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders navigation links and controls', () => {
    renderWithProviders()

    expect(screen.getByRole('button', { name: /explore/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tips/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /widgets/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /help/i })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    renderWithProviders()

    const brandLink = screen.getByRole('link', { name: /stellar tip jar/i })
    expect(brandLink).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^tips$/i })).toHaveAttribute('href', '/tips')
    expect(screen.getByRole('link', { name: /^widgets$/i })).toHaveAttribute('href', '/widgets')
    expect(screen.getByRole('link', { name: /^help$/i })).toHaveAttribute('href', '/help')
  })

  it('renders WalletConnector component', () => {
    renderWithProviders()

    expect(screen.getByTestId('wallet-connector')).toBeInTheDocument()
    expect(mockWalletConnector).toHaveBeenCalled()
  })

  it('has correct semantic structure', () => {
    renderWithProviders()

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it('applies correct styling classes to header', () => {
    renderWithProviders()

    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-20'
    )
  })

  it('applies correct styling classes to navigation container', () => {
    renderWithProviders()

    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toHaveClass(
      'mx-auto',
      'flex',
      'w-full'
    )
  })

  it('brand link has correct styling', () => {
    renderWithProviders()

    const brandLink = screen.getByRole('link', { name: /stellar tip jar/i })
    expect(brandLink).toHaveClass(
      'font-bold'
    )
  })

  it('navigation links container has correct styling', () => {
    renderWithProviders()

    const navList = screen.getByRole('list')
    expect(navList).toHaveClass(
      'hidden',
      'items-center',
      'gap-6',
      'md:flex'
    )
  })

  it('navigation links have correct styling', () => {
    renderWithProviders()

    const tipsLink = screen.getByRole('link', { name: /^tips$/i })
    expect(tipsLink).toHaveClass(
      'transition-colors'
    )
  })

  it('renders responsive design classes', () => {
    renderWithProviders()

    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toHaveClass('w-full')

    const brandLink = screen.getByRole('link', { name: /stellar tip jar/i })
    expect(brandLink).toHaveClass('font-bold')

    const navList = screen.getByRole('list')
    expect(navList).toHaveClass('hidden', 'md:flex')
  })

  it('has correct accessibility attributes', () => {
    renderWithProviders()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('handles missing WalletConnector gracefully', () => {
    mockWalletConnector.mockImplementation(() => <div>Empty</div>)

    expect(() => renderWithProviders()).not.toThrow()
  })
})

