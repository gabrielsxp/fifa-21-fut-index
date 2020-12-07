import { screen } from '@testing-library/react'

import PlayerCard from '.'
import mock from 'components/PlayerCard/mock'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerCard />', () => {
  it('should render a norml sized card', () => {
    renderWithTheme(<PlayerCard {...mock} variant="normal" />)
    expect(screen.getByLabelText(/player rating/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player position/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player name/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/player attribute rating/i)).toHaveLength(6)
    expect(screen.getByAltText(/nation/i)).toBeInTheDocument()
    expect(screen.getByAltText(/team/i)).toBeInTheDocument()
    expect(screen.getByAltText(/picture/i)).toBeInTheDocument()

    expect(screen.getByAltText(/player name/i).parentElement).toHaveStyle({
      width: '22rem',
      height: '30.5rem'
    })
  })
  it('should render a small sized card', () => {
    renderWithTheme(<PlayerCard {...mock} variant="small" />)
    expect(screen.getByLabelText(/player rating/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player position/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/player name/i)).toBeInTheDocument()
    expect(screen.queryAllByLabelText(/player attribute rating/i)).toHaveLength(
      0
    )
    expect(screen.getByAltText(/nation/i)).toBeInTheDocument()
    expect(screen.getByAltText(/team/i)).toBeInTheDocument()
    expect(screen.getByAltText(/picture/i)).toBeInTheDocument()

    expect(screen.getByAltText(/player name/i).parentElement).toHaveStyle({
      width: '9rem',
      height: '11rem'
    })
  })
})
