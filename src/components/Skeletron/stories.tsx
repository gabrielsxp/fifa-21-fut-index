import { Story, Meta } from '@storybook/react/types-6-0'
import Skeletron from '.'

export default {
  title: 'Skeletron',
  component: Skeletron
} as Meta

export const Default: Story = () => (
  <div style={{ width: '100%', height: '100vh' }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '1rem'
      }}
    ></div>
    <Skeletron />
  </div>
)
