import { render, screen } from '@testing-library/react'

import TopPlayers from '.'

describe('<TopPlayers />', () => {
  it('should render the heading', () => {
    const { container } = render(<TopPlayers />)

    expect(screen.getByRole('heading', { name: /TopPlayers/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
