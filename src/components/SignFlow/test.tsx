import { render, screen } from '@testing-library/react'

import SignFlow from '.'

describe('<SignFlow />', () => {
  it('should render the heading', () => {
    const { container } = render(<SignFlow />)

    expect(screen.getByRole('heading', { name: /SignFlow/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
