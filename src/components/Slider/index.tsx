import * as S from './styles'
import SlickSlider, { Settings } from 'react-slick'

export type SliderSettings = Settings

export type SliderProps = {
  children: React.ReactNode
  settings: SliderSettings
  color?: 'light' | 'dark' | 'medium'
}

const Slider = ({ children, settings, color = 'light' }: SliderProps) => (
  <S.Wrapper color={color}>
    <SlickSlider {...settings}>{children}</SlickSlider>
  </S.Wrapper>
)

export default Slider
