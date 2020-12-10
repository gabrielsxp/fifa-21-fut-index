import { render, screen } from '@testing-library/react'

import HomeSearch from '.'

describe('<HomeSearch />', () => {
  it('should render the heading', () => {
    const { container } = render(<HomeSearch />)

    expect(screen.getByRole('heading', { name: /HomeSearch/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
