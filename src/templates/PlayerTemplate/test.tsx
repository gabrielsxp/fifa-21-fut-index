import { screen } from '@testing-library/react'

import PlayerTemplate from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<PlayerTemplate />', () => {
  it('should render the heading', () => {
    renderWithTheme(<PlayerTemplate />)
  })
})
