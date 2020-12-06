import { Story, Meta } from '@storybook/react/types-6-0'
import PlayerHeader, { PlayerHeaderProps } from '.'
import { player } from './mock'

export default {
  title: 'PlayerHeader',
  component: PlayerHeader
} as Meta

export const Default: Story<PlayerHeaderProps> = (args) => (
  <PlayerHeader {...args} />
)

Default.args = {
  player
}
