import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletConnector } from '../WalletConnector'
import { useWallet } from '@/hooks/useWallet'
import type { WalletContextType } from '@/contexts/WalletContext'

// Mock the useWallet hook
vi.mock('@/hooks/useWallet')

const mockUseWallet = vi.mocked(useWallet)

const createWalletState = (overrides: Partial<WalletContextType>): WalletContextType => ({
  isConnected: false,
  isInstalled: true,
  publicKey: null,
  shortAddress: '',
  balance: '0.0',
  network: 'TESTNET',
  provider: 'freighter',
  status: 'idle',
  isConnecting: false,
  isLoading: false,
  error: null,
  connect: vi.fn(),
  disconnect: vi.fn(),
  refreshBalance: vi.fn(),
  signStellarTransaction: vi.fn(),
  ...overrides,
})


describe('WalletConnector Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows connect button when wallet is not connected', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: false,
      publicKey: null,
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const connectButton = screen.getByRole('button', { name: /connect stellar wallet/i })
    expect(connectButton).toBeInTheDocument()
    expect(connectButton).toHaveTextContent('Connect Wallet')
  })

  it('shows wallet info when connected', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      balance: '125.50',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    expect(screen.getByText('TESTNET')).toBeInTheDocument()
    expect(screen.getByText('125.50 XLM')).toBeInTheDocument()
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /disconnect wallet/i })).toBeInTheDocument()
  })

  it('calls connect when connect button is clicked', async () => {
    const mockConnect = vi.fn()
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: false,
      publicKey: null,
      connect: mockConnect,
      disconnect: vi.fn(),
      shortAddress: '',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const connectButton = screen.getByRole('button', { name: /connect stellar wallet/i })
    await user.click(connectButton)

    expect(mockConnect).toHaveBeenCalledTimes(1)
  })

  it('calls disconnect when disconnect button is clicked', async () => {
    const mockDisconnect = vi.fn()
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: mockDisconnect,
      shortAddress: '0x1234...5678',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const disconnectButton = screen.getByRole('button', { name: /disconnect wallet/i })
    await user.click(disconnectButton)

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })

  it('displays network with correct styling when connected', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'PUBLIC'
    }))

    render(<WalletConnector />)

    const networkElement = screen.getByText('PUBLIC')
    expect(networkElement).toHaveClass('font-bold', 'text-wave/60')
  })

  it('displays address with correct styling when connected', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0xABCD...EF12',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const addressElement = screen.getByText('0xABCD...EF12')
    expect(addressElement).toHaveClass('text-ink/70')
  })

  it('has correct container styling when connected', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const region = screen.getByRole('region', { name: 'Connected wallet' })
    // The container with wallet info has specific styling
    const container = region.querySelector('.flex.items-center.gap-2.rounded-xl')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'rounded-xl',
      'border',
      'border-wave/25',
      'bg-white',
      'px-3',
      'py-1.5',
      'text-xs'
    )
  })

  it('disconnect button has correct styling', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    const disconnectButton = screen.getByRole('button', { name: /disconnect wallet/i })
    expect(disconnectButton).toHaveClass(
      'h-8',
      'px-2',
      'py-0',
      'text-xs',
      'text-error'
    )
  })

  it('handles empty short address gracefully', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '',
      network: 'TESTNET'
    }))

    render(<WalletConnector />)

    expect(screen.getByText('TESTNET')).toBeInTheDocument()
    // When shortAddress is empty, the span still exists but with empty content
    const region = screen.getByRole('region', { name: 'Connected wallet' })
    const addressSpan = region.querySelector('span[aria-label="Wallet address: "]')
    expect(addressSpan).toBeInTheDocument()
    expect(addressSpan).toHaveTextContent('')
  })

  it('handles empty network gracefully', () => {
    mockUseWallet.mockReturnValue(createWalletState({
      isConnected: true,
      publicKey: 'GBRP...PLACEHOLDER...2PR5',
      connect: vi.fn(),
      disconnect: vi.fn(),
      shortAddress: '0x1234...5678',
      network: '' as any
    }))

    render(<WalletConnector />)

    const region = screen.getByRole('region', { name: 'Connected wallet' })
    const networkSpan = region.querySelector('span[aria-label="Network: "]')
    expect(networkSpan).toBeInTheDocument()
    expect(networkSpan).toHaveTextContent('')
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
  })
})
