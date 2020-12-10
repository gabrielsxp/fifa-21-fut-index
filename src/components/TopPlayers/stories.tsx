import { Story, Meta } from '@storybook/react/types-6-0'
import TopPlayers from '.'

export default {
  title: 'TopPlayers',
  component: TopPlayers
} as Meta

export const Default: Story = () => <TopPlayers />
