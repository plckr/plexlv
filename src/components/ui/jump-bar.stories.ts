import type { Meta, StoryObj } from '@storybook/svelte';

import JumpBar from './jump-bar.svelte';

const meta = {
  title: 'UI/Jump Bar',
  component: JumpBar,
  tags: ['autodocs'],
  args: {
    order: 'asc'
  },
  argTypes: {
    order: {
      control: { type: 'select' },
      options: ['asc', 'desc']
    }
  }
} satisfies Meta<JumpBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ascendent: Story = {
  args: {}
};

export const Descendent: Story = {
  args: {
    order: 'desc'
  }
};
