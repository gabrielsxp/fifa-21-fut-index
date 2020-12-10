import { render, screen } from '@testing-library/react'

import Skeletron from '.'

describe('<Skeletron />', () => {
  it('should render the heading', () => {
    const { container } = render(<Skeletron />)

    expect(screen.getByRole('heading', { name: /Skeletron/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
