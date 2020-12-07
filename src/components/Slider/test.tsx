import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'

import Slider from '.'

describe('<Slider />', () => {
  it('should render children as slider item', () => {
    const { container } = renderWithTheme(
      <Slider settings={{ infinite: false, slidesToShow: 2 }}>
        <p>Slide 1</p>
        <p>Slide 2</p>
      </Slider>
    )
    expect(
      screen.getByText(/slide 1/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')
    expect(
      screen.getByText(/slide 2/i).parentElement?.parentElement
    ).toHaveClass('slick-slide')
    expect(container.firstChild).toMatchSnapshot()
  })
})
