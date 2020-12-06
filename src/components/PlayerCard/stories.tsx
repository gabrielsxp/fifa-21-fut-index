import { Story, Meta } from '@storybook/react/types-6-0'
import PlayerCard, { PlayerCardProps } from '.'
import mock from './mock'

export default {
  title: 'PlayerCard',
  component: PlayerCard
} as Meta

export const Default: Story<PlayerCardProps> = (args) => (
  <PlayerCard {...args} />
)

export const Small: Story<PlayerCardProps> = (args) => <PlayerCard {...args} />

Default.args = {
  ...mock,
  variant: 'normal'
}

Small.args = {
  ...mock,
  variant: 'small'
}
