import TeamHeader from '.'
import { renderWithTheme } from 'utils/helpers'

describe('<TeamHeader />', () => {
  it('should render the heading', () => {
    renderWithTheme(<TeamHeader />)
  })
})
