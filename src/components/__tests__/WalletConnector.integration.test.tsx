/**
 * WalletConnector — integration tests
 *
 * Complements WalletConnector.test.tsx (which mocks `useWallet` entirely).
 * This file renders through the real WalletProvider → WalletContext →
 * useWalletStore chain, using `useWalletStore.setState` to drive state
 * rather than mocking the hook.  This exercises the context derivation
 * logic (isConnected, isLoading, error mapping, etc.) that the unit tests
 * bypass.
 *
 * Fixes for issue #579:
 *  1. Mock `walletStore.initialize` so it is a no-op — without this,
 *     WalletProvider.useEffect calls initialize() on mount which talks to
 *     FreighterWallet and resets any state set in beforeEach back to
 *     'unavailable', causing the loading-state and error-state tests to fail.
 *  2. Wrap the bare `render(<WalletConnector />)` in the accessibility test
 *     with renderWithProvider — missing the provider caused useWalletContext
 *     to throw "must be used within a WalletProvider".
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletConnector } from '../WalletConnector'
import { WalletProvider } from '@/contexts/WalletContext'
import { useWalletStore } from '@/store/walletStore'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Helpers ──────────────────────────────────────────────────────────────────

const renderWithProvider = (ui: React.ReactNode) =>
  render(<WalletProvider>{ui}</WalletProvider>)

// ── Suite ────────────────────────────────────────────────────────────────────

describe('WalletConnector — integration (via WalletProvider)', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Prevent WalletProvider.useEffect from calling initialize() and
    // overwriting the store state set per-test.  initialize() talks to
    // FreighterWallet which is unavailable in jsdom, so without this mock
    // every test would have its store state reset to 'unavailable'.
    vi.spyOn(useWalletStore.getState(), 'initialize').mockResolvedValue(undefined)

    // Reset to a clean disconnected state before each test
    useWalletStore.setState({
      status: 'available',
      publicKey: null,
      balance: '0',
      error: null,
    })
  })

  // --------------------------------------------------------------------------
  // 1. Disconnected state
  // --------------------------------------------------------------------------
  it('renders connect button when wallet is not connected', () => {
    renderWithProvider(<WalletConnector />)
    const button = screen.getByRole('button', { name: /connect/i })
    expect(button).toBeInTheDocument()
  })

  // --------------------------------------------------------------------------
  // 2. Loading / connecting state
  //
  // WalletContext derives isLoading = isConnecting = (storeStatus === 'connecting').
  // The component hits the `if (isLoading)` early-return branch, which renders
  // a disabled button with aria-busy and the text "Checking wallet...".
  // The "Connecting..." text is on the connect button's inner branch, but that
  // branch is never reached when isLoading is true — so we assert on what the
  // component actually renders in this state.
  // --------------------------------------------------------------------------
  it('displays loading state while connecting', () => {
    useWalletStore.setState({ status: 'connecting' })
    renderWithProvider(<WalletConnector />)
    expect(screen.getByRole('button', { name: /checking wallet/i })).toBeInTheDocument()
  })

  // --------------------------------------------------------------------------
  // 3. Error state
  //
  // WalletContext maps `error?.message` to the context error string.
  // The component renders a role="alert" span in the disconnected state when
  // an error is present.
  // --------------------------------------------------------------------------
  it('handles connection errors gracefully', () => {
    useWalletStore.setState({
      status: 'available',
      error: { code: 'UNKNOWN_ERROR', message: 'Failed to connect' } as any,
    })
    renderWithProvider(<WalletConnector />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  // --------------------------------------------------------------------------
  // 4. Accessibility attributes
  //
  // The connect button must have an aria-label — verify the attribute exists
  // when rendered inside its required WalletProvider.
  // --------------------------------------------------------------------------
  it('has proper accessibility attributes', () => {
    renderWithProvider(<WalletConnector />)
    const button = screen.getByRole('button', { name: /connect/i })
    expect(button).toHaveAttribute('aria-label')
  })
})
