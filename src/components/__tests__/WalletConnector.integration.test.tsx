import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletConnector } from '../WalletConnector'
import { WalletProvider } from '@/contexts/WalletContext'
import { useWalletStore } from '@/store/walletStore'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const renderWithProvider = (ui: React.ReactNode) => render(<WalletProvider>{ui}</WalletProvider>)

describe('WalletConnector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useWalletStore.setState({
      status: 'available',
      publicKey: null,
      balance: '0',
      error: null,
    })
  })

  it('renders connect button when wallet is not connected', () => {
    renderWithProvider(<WalletConnector />)
    const button = screen.getByRole('button', { name: /connect/i })
    expect(button).toBeInTheDocument()
  })

  it('displays loading state while connecting', () => {
    useWalletStore.setState({ status: 'connecting' })
    renderWithProvider(<WalletConnector />)
    expect(screen.getByRole('button', { name: /checking wallet/i })).toBeInTheDocument()
  })

  it('handles connection errors gracefully', () => {
    useWalletStore.setState({ error: { code: 'UNKNOWN_ERROR', message: 'Failed to connect' } as any })
    renderWithProvider(<WalletConnector />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithProvider(<WalletConnector />)
    const button = screen.getByRole('button', { name: /connect/i })
    
    expect(button).toHaveAttribute('aria-label')
  })
})
