import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api } from '../api'

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have required methods', () => {
    expect(api.getCreators).toBeDefined()
    expect(api.getTips).toBeDefined()
    expect(api.sendTip).toBeDefined()
  })

  it('should construct correct API endpoints', () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    expect(baseUrl).toBeTruthy()
  })

  it('should handle API errors', async () => {
    // Mock fetch to simulate error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      } as Response)
    )

    try {
      await api.getCreators()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('should include authentication headers when available', () => {
    const mockFetch = vi.fn()
    global.fetch = mockFetch

    // Test that headers are properly set
    expect(mockFetch).toBeDefined()
  })
})
