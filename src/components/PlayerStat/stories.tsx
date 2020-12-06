import { Story, Meta } from '@storybook/react/types-6-0'
import PlayerStat, { PlayerStatProps } from '.'

export default {
  title: 'PlayerStat',
  component: PlayerStat
} as Meta

export const WithoutLabel: Story<PlayerStatProps> = (args) => (
  <PlayerStat {...args} />
)
export const WithLabelLight: Story<PlayerStatProps> = (args) => (
  <PlayerStat {...args} />
)
export const WithLabelDark: Story<PlayerStatProps> = (args) => (
  <PlayerStat {...args} />
)

WithoutLabel.args = {
  stat: 99
}

WithLabelLight.args = {
  stat: 99,
  label: 'Potential'
}

WithLabelLight.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

WithLabelDark.args = {
  stat: 99,
  label: 'Potential',
  scheme: 'dark'
}
