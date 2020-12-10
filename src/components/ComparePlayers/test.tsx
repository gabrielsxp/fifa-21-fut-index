import { render, screen } from '@testing-library/react'

import ComparePlayers from '.'

describe('<ComparePlayers />', () => {
  it('should render the heading', () => {
    const { container } = render(<ComparePlayers />)

    expect(screen.getByRole('heading', { name: /ComparePlayers/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
