import { screen } from '@testing-library/react'

import PlayerStatusBar from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerStatusBar />', () => {
  it('should render a player Bar with red color', () => {
    renderWithTheme(<PlayerStatusBar stat={40} />)

    expect(screen.getByLabelText(/Player Stat Bar/i)).toHaveStyle({
      backgroundColor: '#bd2f2f'
    })
  })
  it('should render a player Bar with orange color', () => {
    renderWithTheme(<PlayerStatusBar stat={50} />)

    expect(screen.getByLabelText(/Player Stat Bar/i)).toHaveStyle({
      backgroundColor: '#c8790a'
    })
  })
  it('should render a player Bar with light green color', () => {
    renderWithTheme(<PlayerStatusBar stat={80} />)

    expect(screen.getByLabelText(/Player Stat Bar/i)).toHaveStyle({
      backgroundColor: '#99cf46'
    })
  })
  it('should render a player Bar with dark green color', () => {
    renderWithTheme(<PlayerStatusBar stat={99} />)

    expect(screen.getByLabelText(/Player Stat Bar/i)).toHaveStyle({
      backgroundColor: '#4e8142'
    })
  })
  it('should render a player stat with a white label', () => {
    renderWithTheme(<PlayerStatusBar stat={99} label="Potential" />)

    expect(screen.getByLabelText(/Player Stat Bar/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
  it('should render a player stat with a dark label', () => {
    renderWithTheme(
      <PlayerStatusBar stat={99} scheme="dark" label="Potential" />
    )

    expect(screen.getByLabelText(/Player Stat Bar/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#030517'
    })
  })
})
