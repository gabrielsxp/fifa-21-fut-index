import { screen, fireEvent } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'

import Navbar from '.'

describe('<Navbar />', () => {
  it('should render the menu correctly', () => {
    renderWithTheme(<Navbar />)

    expect(screen.getAllByText(/home/i)).toHaveLength(2)
    expect(screen.getAllByText(/browse posts/i)).toHaveLength(2)
    expect(screen.getAllByAltText(/Image of a console joystick/i)).toHaveLength(
      2
    )
    expect(screen.getByLabelText(/menu icon/i)).toBeInTheDocument()
  })
  it('should render the mobile menu when then menu icon is clicked', () => {
    renderWithTheme(<Navbar />)
    expect(
      screen.getByLabelText(/menu icon/i).parentElement
    ).toBeInTheDocument()
    expect(screen.getByTestId('menu-mobile-wrapper')).not.toHaveClass(
      'display-mobile-menu'
    )
    fireEvent.click(screen.getByLabelText(/enu icon/i))

    expect(screen.getByTestId('menu-mobile-wrapper')).toHaveClass(
      'display-mobile-menu'
    )
  })
})
