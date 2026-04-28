import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { tipFormSchema, creatorFormSchema } from '@/lib/validation/schemas'
import { TipForm } from '@/components/forms/TipForm'
import { CreatorForm } from '@/components/forms/CreatorForm'

// ── Schema unit tests ─────────────────────────────────────────────────────────

describe('tipFormSchema', () => {
  const valid = { username: 'alice', amount: '10.5', message: '' }

  it('accepts valid input', () => {
    expect(tipFormSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects username shorter than 3 chars', () => {
    const result = tipFormSchema.safeParse({ ...valid, username: 'ab' })
    expect(result.success).toBe(false)
  })

  it('rejects username with invalid characters', () => {
    const result = tipFormSchema.safeParse({ ...valid, username: 'alice!' })
    expect(result.success).toBe(false)
  })

  it('rejects amount of zero', () => {
    const result = tipFormSchema.safeParse({ ...valid, amount: '0' })
    expect(result.success).toBe(false)
  })

  it('rejects amount with more than 7 decimal places', () => {
    const result = tipFormSchema.safeParse({ ...valid, amount: '1.12345678' })
    expect(result.success).toBe(false)
  })

  it('rejects message longer than 200 chars', () => {
    const result = tipFormSchema.safeParse({ ...valid, message: 'a'.repeat(201) })
    expect(result.success).toBe(false)
  })
})

describe('creatorFormSchema', () => {
  const valid = {
    username: 'alice',
    wallet_address: 'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN',
    displayName: 'Alice',
    bio: '',
    email: '',
  }

  it('accepts valid input', () => {
    expect(creatorFormSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects invalid Stellar address', () => {
    const result = creatorFormSchema.safeParse({ ...valid, wallet_address: 'INVALID' })
    expect(result.success).toBe(false)
  })

  it('rejects address not starting with G', () => {
    const result = creatorFormSchema.safeParse({ ...valid, wallet_address: 'B' + 'A'.repeat(55) })
    expect(result.success).toBe(false)
  })

  it('rejects username longer than 30 chars', () => {
    const result = creatorFormSchema.safeParse({ ...valid, username: 'a'.repeat(31) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = creatorFormSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('accepts empty optional fields', () => {
    const result = creatorFormSchema.safeParse({ ...valid, displayName: '', bio: '', email: '' })
    expect(result.success).toBe(true)
  })
})

// ── Form component tests ──────────────────────────────────────────────────────

describe('TipForm', () => {
  const user = userEvent.setup()

  it('renders all fields', () => {
    render(<TipForm />)
    expect(screen.getByLabelText(/creator username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows inline error for empty username on submit', async () => {
    render(<TipForm />)
    await user.click(screen.getByRole('button', { name: /submit tip/i }))
    await waitFor(() =>
      expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument()
    )
  })

  it('shows error for invalid amount', async () => {
    render(<TipForm />)
    const amountInput = screen.getByLabelText(/amount/i)
    await user.type(amountInput, '0')
    await user.tab()
    await waitFor(() =>
      expect(screen.getByText(/greater than 0/i)).toBeInTheDocument()
    )
  })
})

describe('CreatorForm', () => {
  const user = userEvent.setup()
  const noop = vi.fn().mockResolvedValue(undefined)

  it('renders all fields', () => {
    render(<CreatorForm onSubmit={noop} />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/stellar wallet address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('shows error for invalid wallet address on blur', async () => {
    render(<CreatorForm onSubmit={noop} />)
    const walletInput = screen.getByLabelText(/stellar wallet address/i)
    await user.type(walletInput, 'INVALID')
    await user.tab()
    await waitFor(() =>
      expect(screen.getByText(/invalid stellar address/i)).toBeInTheDocument()
    )
  })

  it('calls onSubmit with valid data', async () => {
    render(<CreatorForm onSubmit={noop} />)
    await user.type(screen.getByLabelText(/username/i), 'alice')
    await user.type(
      screen.getByLabelText(/stellar wallet address/i),
      'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN'
    )
    await user.click(screen.getByRole('button', { name: /register as creator/i }))
    await waitFor(() => expect(noop).toHaveBeenCalledTimes(1))
  })

  it('submit button is disabled while submitting', async () => {
    const slowSubmit = vi.fn(() => new Promise<void>((r) => setTimeout(r, 500)))
    render(<CreatorForm onSubmit={slowSubmit} />)
    await user.type(screen.getByLabelText(/username/i), 'alice')
    await user.type(
      screen.getByLabelText(/stellar wallet address/i),
      'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN'
    )
    await user.click(screen.getByRole('button', { name: /register as creator/i }))
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled()
  })
})
