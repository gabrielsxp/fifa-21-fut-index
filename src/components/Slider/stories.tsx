import { Story, Meta } from '@storybook/react/types-6-0'
import { Settings } from 'react-slick'
import Slider, { SliderSettings, SliderProps } from '.'
import styled from 'styled-components'

export default {
  title: 'Slider',
  component: Slider
} as Meta

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}
const verticalSettings: Settings = {
  vertical: true,
  verticalSwiping: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const Slide = styled.div`
  background-color: lightgrey;
  padding: 20rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid red;
  font-weight: bold;
  font-size: 5rem;
  text-align: center;
  border-radius: 0.5rem;
`

export const Horizontal: Story<SliderProps> = () => (
  <Slider settings={settings}>
    {Array.from(new Array(5)).map((_, index) => (
      <Slide key={index}>{index + 1}</Slide>
    ))}
  </Slider>
)
export const Vertical: Story<SliderProps> = () => (
  <Slider settings={verticalSettings}>
    {Array.from(new Array(5)).map((_, index) => (
      <Slide key={index}>{index + 1}</Slide>
    ))}
  </Slider>
)
