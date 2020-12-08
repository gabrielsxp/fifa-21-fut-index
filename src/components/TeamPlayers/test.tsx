import { render, screen } from '@testing-library/react'

import TeamPlayers from '.'

describe('<TeamPlayers />', () => {
  it('should render the heading', () => {
    const { container } = render(<TeamPlayers />)

    expect(screen.getByRole('heading', { name: /TeamPlayers/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
