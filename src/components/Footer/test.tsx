import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'
import Footer from '.'

describe('<Footer />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByRole('heading', { name: /Links/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Follow us on/i })
    ).toBeInTheDocument()
  })
})
