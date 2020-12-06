import { renderWithTheme } from 'utils/helpers'
import theme from 'styles/theme'
import { Container } from '.'

describe('<Container />', () => {
  it('should render the container correctly', () => {
    const { container } = renderWithTheme(
      <Container>Yu-Gi-Oh ! Deck builder</Container>
    )

    expect(container.firstChild).toHaveStyleRule(
      'max-width',
      theme.grid.container
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        position: relative;
        max-width: 130rem;
        margin-left: auto;
        margin-right: auto;
        padding-left: calc(3.2rem / 2);
        padding-right: calc(3.2rem / 2);
      }

      <div
        class="c0"
      >
        Yu-Gi-Oh ! Deck builder
      </div>
    `)
  })
})
