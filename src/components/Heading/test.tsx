import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'

import Heading from '.'

describe('<Heading />', () => {
  it('should render a white heading', () => {
    renderWithTheme(<Heading>Latest Decks</Heading>)
    expect(screen.getByRole('heading')).toHaveStyle({ color: '#FAFAFA' })
  })
  it('should render a black heading', () => {
    renderWithTheme(<Heading color="dark">Latest Decks</Heading>)
    expect(screen.getByRole('heading')).toHaveStyle({ color: '#030517' })
  })
  it('should render a large black heading', () => {
    renderWithTheme(
      <Heading size="large" color="dark">
        Latest Decks
      </Heading>
    )
    expect(screen.getByRole('heading')).toHaveStyle({
      color: '#030517',
      'font-size': '4.199999999999999rem'
    })
  })
  it('should render a small heading with primary color', () => {
    renderWithTheme(
      <Heading size="small" color="primary">
        Latest Decks
      </Heading>
    )
    expect(screen.getByRole('heading')).toHaveStyle({
      'font-size': '1.6rem',
      color: '#d5057f'
    })
  })
})
