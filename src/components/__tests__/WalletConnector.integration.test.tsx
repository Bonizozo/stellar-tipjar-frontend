import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletConnector } from '../WalletConnector'
import { WalletProvider } from '@/contexts/WalletContext'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FreighterWallet } from '@/lib/wallet/provider'

vi.mock('@stellar/freighter-api', () => ({
  isConnected: vi.fn(async () => ({ isConnected: true })),
  isAllowed: vi.fn(async () => ({ isAllowed: true })),
  setAllowed: vi.fn(async () => ({ isAllowed: true })),
  getAddress: vi.fn(async () => ({ address: 'GBRP...PLACEHOLDER...2PR5' })),
  getNetwork: vi.fn(async () => ({ network: 'TESTNET' })),
  signTransaction: vi.fn(),
}))

vi.spyOn(FreighterWallet.prototype, 'getBalance').mockResolvedValue('100.0')

const renderWithProvider = () =>
  render(
    <WalletProvider>
      <WalletConnector />
    </WalletProvider>
  )

const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

const storageMock = createStorageMock();
if (typeof globalThis.localStorage === "undefined" || !globalThis.localStorage.clear) {
  Object.defineProperty(globalThis, "localStorage", {
    value: storageMock,
    writable: true,
    configurable: true,
  });
}

describe('WalletConnector Integration Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders connect button when wallet is not connected', async () => {
    renderWithProvider()
    const button = await screen.findByRole('button', { name: /connect/i })
    expect(button).toBeInTheDocument()
  })

  it('displays loading state or button while connecting', async () => {
    renderWithProvider()
    const button = await screen.findByRole('button', { name: /connect/i })
    
    await user.click(button)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles connection lifecycle gracefully', async () => {
    renderWithProvider()
    const button = await screen.findByRole('button', { name: /connect/i })
    
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByRole('region')).toBeInTheDocument()
    })
  })

  it('has proper accessibility attributes', async () => {
    renderWithProvider()
    const button = await screen.findByRole('button', { name: /connect/i })
    
    expect(button).toHaveAttribute('aria-label')
  })
})



