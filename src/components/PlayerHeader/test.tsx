import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'
import PlayerHeader from '.'
import { player } from 'components/PlayerHeader/mock'

describe('<PlayerHeader />', () => {
  it('should render a player header completely', () => {
    const { container } = renderWithTheme(<PlayerHeader player={player} />)
    expect(screen.getByLabelText(/player jersey/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nation name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/team name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player height/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player weight/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player weak foot/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player skill moves/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player work rate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player foot/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player real face/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/player international reputation/i)
    ).toBeInTheDocument()
    expect(screen.getByAltText(/player image/i)).toBeInTheDocument()
    expect(screen.getByAltText(/nation image/i)).toBeInTheDocument()
    expect(screen.getByAltText(/team image/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/status bar/i)).toHaveLength(6)
    expect(screen.getAllByLabelText(/status badge/i)).toHaveLength(2)
  })
})
