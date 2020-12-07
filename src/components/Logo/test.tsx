import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('<Logo />', () => {
  it('should render the heading', () => {
    render(<Logo />)
    expect(
      screen.getByAltText(/Image of a console joystick/i)
    ).toBeInTheDocument()
  })
})
