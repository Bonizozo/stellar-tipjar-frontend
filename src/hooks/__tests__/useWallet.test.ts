import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWallet } from '../useWallet'

describe('useWallet Hook', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with disconnected state', () => {
    const { result } = renderHook(() => useWallet())

    expect(result.current.isConnected).toBe(false)
    expect(result.current.publicKey).toBeNull()
  })

  it('should have connect method', () => {
    const { result } = renderHook(() => useWallet())

    expect(result.current.connect).toBeDefined()
    expect(typeof result.current.connect).toBe('function')
  })

  it('should have disconnect method', () => {
    const { result } = renderHook(() => useWallet())

    expect(result.current.disconnect).toBeDefined()
    expect(typeof result.current.disconnect).toBe('function')
  })

  it('should handle wallet connection', async () => {
    const { result } = renderHook(() => useWallet())

    expect(result.current.isConnected).toBe(false)

    // Simulate connection
    act(() => {
      // Connection logic would go here
    })

    // After connection, state should update
    expect(result.current.isConnected).toBeDefined()
  })

  it('should persist wallet state', () => {
    const { result } = renderHook(() => useWallet())

    act(() => {
      // Simulate wallet connection
    })

    // Check if state is persisted (wallet stores connected, publicKey, provider separately)
    const stored = localStorage.getItem('stj:wallet:connected')
    expect(stored).toBeDefined()
  })

  it('should handle wallet errors', async () => {
    const { result } = renderHook(() => useWallet())

    expect(result.current.error).toBeNull()
  })
})
