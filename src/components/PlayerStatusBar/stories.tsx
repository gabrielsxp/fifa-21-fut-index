import { Story, Meta } from '@storybook/react/types-6-0'
import PlayerStatusBar, { PlayerStatusBarProps } from '.'

export default {
  title: 'PlayerStatusBar',
  component: PlayerStatusBar
} as Meta

export const WithoutLabel: Story<PlayerStatusBarProps> = (args) => (
  <PlayerStatusBar {...args} />
)

export const WithLightLabel: Story<PlayerStatusBarProps> = (args) => (
  <PlayerStatusBar {...args} />
)

export const WithDarkLabel: Story<PlayerStatusBarProps> = (args) => (
  <PlayerStatusBar {...args} />
)

WithoutLabel.args = {
  stat: 80
}

WithLightLabel.args = {
  stat: 80,
  label: 'Strength'
}

WithLightLabel.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

WithDarkLabel.args = {
  stat: 80,
  label: 'Strength',
  scheme: 'dark'
}
