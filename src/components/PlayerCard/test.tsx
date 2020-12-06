import { render, screen } from '@testing-library/react'

import PlayerCard from '.'

describe('<PlayerCard />', () => {
  it('should render the heading', () => {
    const { container } = render(<PlayerCard />)

    expect(screen.getByRole('heading', { name: /PlayerCard/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
