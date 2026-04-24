import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'
import { Select } from '../Select'
import { Checkbox } from '../Checkbox'
import { Toggle } from '../Toggle'

describe('Form Controls', () => {
  const user = userEvent.setup()

  it('Input handles value change and floating label', async () => {
    const handleChange = vi.fn()
    render(
      <Input
        id="email"
        name="email"
        label="Email"
        value=""
        onChange={handleChange}
        helperText="Enter email"
      />
    )

    const input = screen.getByLabelText('Email') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(screen.getByText('Enter email')).toBeInTheDocument()

    await user.type(input, 'user@example.com')
    expect(handleChange).toHaveBeenCalled()
  })

  it('Select renders options and responds to change', async () => {
    const handleChange = vi.fn()
    render(
      <Select
        id="plan"
        name="plan"
        label="Plan"
        value="basic"
        onChange={handleChange}
        options={[
          { value: 'basic', label: 'Basic' },
          { value: 'pro', label: 'Pro' },
        ]}
      />
    )

    const select = screen.getByLabelText('Plan') as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Basic' })).toBeInTheDocument()

    await user.selectOptions(select, 'pro')
    expect(handleChange).toHaveBeenCalled()
  })

  it('Checkbox toggles and has accessible labeling', async () => {
    const handleChange = vi.fn()
    render(
      <Checkbox
        id="accept"
        name="accept"
        label="Accept terms"
        checked={false}
        onChange={handleChange}
      />
    )

    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
  })

  it('Toggle has switch role and can be toggled', async () => {
    const handleChange = vi.fn()
    render(
      <Toggle
        id="newsletter"
        name="newsletter"
        label="Subscribe"
        checked={false}
        onChange={handleChange}
      />
    )

    const toggle = screen.getByRole('switch', { name: 'Subscribe' }) as HTMLInputElement
    expect(toggle).toBeInTheDocument()
    expect(toggle).not.toBeChecked()

    await user.click(toggle)
    expect(handleChange).toHaveBeenCalled()
  })
})
