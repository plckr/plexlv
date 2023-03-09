import type { Meta, StoryObj } from '@storybook/svelte';
import Icon, { icons } from './icon.svelte';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: Object.keys(icons)
    }
  }
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: 'home' }
};
