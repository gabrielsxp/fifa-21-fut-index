import { screen } from '@testing-library/react'

import PlayerStat from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerStat />', () => {
  it('should render a player badge with red color', () => {
    renderWithTheme(<PlayerStat stat={40} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#bd2f2f'
    })
  })
  it('should render a player badge with orange color', () => {
    renderWithTheme(<PlayerStat stat={50} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#c8790a'
    })
  })
  it('should render a player badge with light green color', () => {
    renderWithTheme(<PlayerStat stat={80} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#99cf46'
    })
  })
  it('should render a player badge with dark green color', () => {
    renderWithTheme(<PlayerStat stat={99} />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toHaveStyle({
      backgroundColor: '#4e8142'
    })
  })
  it('should render a player stat with a white label', () => {
    renderWithTheme(<PlayerStat stat={99} label="Potential" />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
  it('should render a player stat with a dark label', () => {
    renderWithTheme(<PlayerStat stat={99} scheme="dark" label="Potential" />)

    expect(screen.getByLabelText(/Player Stat Badge/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Player Stat Name/i)).toHaveStyle({
      color: '#030517'
    })
  })
})
