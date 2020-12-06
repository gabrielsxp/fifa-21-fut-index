import { screen } from '@testing-library/react'

import PlayerHeader from '.'
import { renderWithTheme } from 'utils/helpers'
describe('<PlayerHeader />', () => {
  it('should render the heading', () => {
    renderWithTheme(<PlayerHeader />)
  })
})
