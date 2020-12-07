import { renderWithTheme } from 'utils/helpers'
import SectionBackground from '.'

describe('<SectionBackground />', () => {
  it('should render the section background', () => {
    const { container } = renderWithTheme(
      <SectionBackground>
        <p>section background</p>
      </SectionBackground>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
