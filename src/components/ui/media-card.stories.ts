import type { Meta, StoryObj } from '@storybook/svelte';
import MediaCard from './media-card.svelte';

const meta = {
	title: 'UI/Media Card',
	component: MediaCard,
	tags: ['autodocs'],
	args: {
		title: '007 - Alvo em Movimento',
		subtitle: '1985',
		href: '/'
	},
	argTypes: {}
} satisfies Meta<MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
