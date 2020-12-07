import { Story, Meta } from '@storybook/react/types-6-0'
import BoxCardPackCarousel, { BoxCardPackCarouselProps } from '.'
import data from './mock'

export default {
  title: 'BoxCardPackCarousel',
  component: BoxCardPackCarousel
} as Meta

export const DarkCarousel: Story<BoxCardPackCarouselProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <BoxCardPackCarousel {...args} items={data} />
  </div>
)
DarkCarousel.args = {
  title: 'Similar Players',
  subtitle: 'Player that can play also as ST',
  color: 'dark'
}

DarkCarousel.parameters = {
  template: 'fullscreen',
  backgrounds: {
    default: 'dark'
  }
}
