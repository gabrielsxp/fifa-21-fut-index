import * as S from './styles'
import Slider, { SliderSettings } from 'components/Slider'
import Heading from 'components/Heading'
import { NavigateNext as NavigateNextIcon } from '@styled-icons/material-sharp/NavigateNext'
import { NavigateBefore as NavigateBeforeIcon } from '@styled-icons/material-sharp/NavigateBefore'
import PlayerCard from 'components/PlayerCard'
import { Player as PlayerProps } from 'generated/graphql'
import { playerCardDataFormatted } from 'utils/playerMethods'

export type BoxCardPackCarouselProps = {
  title: string
  subtitle?: string
  items: PlayerProps[]
  color?: 'light' | 'dark' | 'medium'
}

const settings: SliderSettings = {
  arrows: true,
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  lazyLoad: 'ondemand',
  nextArrow: <NavigateNextIcon aria-label="next packs" />,
  prevArrow: <NavigateBeforeIcon aria-label="previous packs" />,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 570,
      settings: {
        arrows: false,
        slidesToShow: 1.4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 320,
      settings: {
        arrows: false,
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
  ]
}

const BoxCardPackCarousel = ({
  title,
  subtitle = '',
  items,
  color = 'light'
}: BoxCardPackCarouselProps) => (
  <S.Wrapper aria-label="Carousel Container">
    <S.SectionTitles>
      <Heading size="large" color={color === 'light' ? 'dark' : 'primary'}>
        {title}
      </Heading>
      {!!subtitle && (
        <Heading size="small" color={color === 'light' ? 'primary' : 'light'}>
          {subtitle}
        </Heading>
      )}
    </S.SectionTitles>
    {items && items.length > 0 && (
      <Slider color={color} settings={settings}>
        {items &&
          items.map((player: PlayerProps, index) => {
            return (
              <PlayerCard key={index} {...playerCardDataFormatted(player)} />
            )
          })}
      </Slider>
    )}
  </S.Wrapper>
)

export default BoxCardPackCarousel
