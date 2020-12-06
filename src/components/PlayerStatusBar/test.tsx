import { screen } from '@testing-library/react'

import PlayerStatusBar from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerStatusBar />', () => {
  it('should render a player badge with red color', () => {
    renderWithTheme(<PlayerStatusBar stat={40} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#bd2f2f'
    })
  })
  it('should render a player badge with orange color', () => {
    renderWithTheme(<PlayerStatusBar stat={50} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#c8790a'
    })
  })
  it('should render a player badge with light green color', () => {
    renderWithTheme(<PlayerStatusBar stat={80} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#99cf46'
    })
  })
  it('should render a player badge with dark green color', () => {
    renderWithTheme(<PlayerStatusBar stat={99} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#4e8142'
    })
  })
  it('should render a player stat with a white label', () => {
    renderWithTheme(<PlayerStatusBar stat={99} label="Potential" />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
  it('should render a player stat with a dark label', () => {
    renderWithTheme(
      <PlayerStatusBar stat={99} scheme="dark" label="Potential" />
    )

    expect(screen.getByLabelText(/Player Stat Badge/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#030517'
    })
  })
})
