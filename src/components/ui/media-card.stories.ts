import type { Meta, StoryObj } from '@storybook/svelte';
import MediaCard from './media-card.svelte';

const meta = {
  title: 'UI/Media Card',
  component: MediaCard,
  tags: ['autodocs'],
  args: {
    title: '007 - Alvo em Movimento',
    subtitle: '1985',
    badge: undefined,
    href: '/'
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    badge: { control: 'text' },
    href: { control: 'text' }
  }
} satisfies Meta<MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Movie: Story = {
  args: {}
};

export const Show: Story = {
  args: {
    title: 'Your honor',
    subtitle: '2 temporadas',
    href: '/',
    badge: 8
  }
};
