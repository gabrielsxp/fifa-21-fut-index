import { Story, Meta } from '@storybook/react/types-6-0'
import PlayerAttrbutes, { PlayerAttributesProps } from '.'
import { player } from './mock'

export default {
  title: 'PlayerAttrbutes',
  component: PlayerAttrbutes
} as Meta

export const Default: Story<PlayerAttributesProps> = (args) => (
  <PlayerAttrbutes {...args} />
)

Default.args = {
  player
}
