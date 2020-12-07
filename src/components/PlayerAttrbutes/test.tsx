import { screen } from '@testing-library/react'
import { player } from 'components/PlayerHeader/mock'

import PlayerAttrbutes from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerAttrbutes />', () => {
  it('should render the heading', () => {
    renderWithTheme(<PlayerAttrbutes player={player} />)
    expect(screen.getByRole('heading', { name: /pace/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /shooting/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /passing/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /dribbling/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /defending/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /physicality/i })
    ).toBeInTheDocument()
    expect(screen.getAllByLabelText(/status bar/i)).toHaveLength(29)
    expect(screen.getAllByLabelText(/status badge/i)).toHaveLength(6)
  })
})
