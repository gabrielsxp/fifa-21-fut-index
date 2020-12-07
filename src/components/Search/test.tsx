import { screen, fireEvent } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'

import Search from '.'

describe('<Search />', () => {
  it('should render the search behavior correctly', () => {
    renderWithTheme(<Search />)
    expect(screen.getByLabelText(/search icon/i)).toBeInTheDocument()
    expect(screen.getByTestId('search-container')).not.toBeVisible()
  })
  it('should render the search box when the search icon is clicked', () => {
    renderWithTheme(<Search />)
    expect(screen.getByLabelText(/search icon/i)).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(/search icon/i))
    expect(screen.getByTestId('search-container')).toBeVisible()
    expect(screen.getByLabelText(/search close icon/i)).toBeVisible()
    fireEvent.click(screen.getByLabelText(/search close icon/i))
    expect(screen.getByTestId('search-container')).not.toBeVisible()
  })
})
