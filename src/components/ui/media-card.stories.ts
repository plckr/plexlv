import type { Meta, StoryObj } from '@storybook/svelte';

import MediaCard from './media-card.svelte';

const meta = {
  title: 'UI/Media Card',
  component: MediaCard,
  tags: ['autodocs'],
  args: {
    title: 'Media title',
    subtitle: 'Subtitle',
    href: '/',
    image: {
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjAwIDMwMCI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIHN0eWxlPSJmaWxsOiAjZDNkMmQyIiAvPgogIDxsaW5lIHgxPSIxMjMuMzMiIHkxPSIxODUiIHgyPSIyMDAiIHkyPSIzMDAiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTAiIC8+CiAgPGxpbmUgeDI9Ijc2LjY3IiB5Mj0iMTE1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwIiAvPgogIDxsaW5lIHgxPSIxMjMuMzMiIHkxPSIxMTUiIHgyPSIyMDAiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTAiIC8+CiAgPGxpbmUgeTE9IjMwMCIgeDI9Ijc2LjY3IiB5Mj0iMTg1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwIiAvPgogIDxnPgogICAgPHBhdGggZD0iTTQyLjA3LDEyOS41N2gxLjg3djQwSDQyLjA3WiIgc3R5bGU9ImZpbGw6ICNmZmYiIC8+CiAgICA8cGF0aAogICAgICBkPSJNNDkuMjksMTI5LjU3SDUybDExLjg1LDM3LjI5aC4wOGwxMS43Mi0zNy4yOWgyLjY3djQwSDc2LjQydi0zN2gtLjA5bC0xMS41NSwzN0g2Mi45MmwtMTEuNjgtMzdoLS4wOHYzN0g0OS4yOVoiCiAgICAgIHN0eWxlPSJmaWxsOiAjZmZmIiAvPgogICAgPHBhdGggZD0iTTkyLjYzLDEyOS41N2gybDEyLDQwaC0ybC0zLjgyLTEyLjg0SDg2LjMxbC0zLjg3LDEyLjg0aC0yWm03LjYsMjUuMDdMOTMuNzQsMTMyaC0uMDlMODYuOSwxNTQuNjRaIgogICAgICBzdHlsZT0iZmlsbDogI2ZmZiIgLz4KICAgIDxwYXRoCiAgICAgIGQ9Ik0xMDYuOTQsMTQ5LjgxYTMzLjI5LDMzLjI5LDAsMCwxLDEtOC4xLDIzLDIzLDAsMCwxLDIuNzgtNi43NiwxNC41NywxNC41NywwLDAsMSw0LjQ4LTQuNjIsMTEsMTEsMCwwLDEsNi4wOS0xLjcxLDExLjM2LDExLjM2LDAsMCwxLDguMjYsMy41MywxNS41LDE1LjUsMCwwLDEsMi44Miw0LjIxLDE4Ljc4LDE4Ljc4LDAsMCwxLDEuNTMsNS42aC0xLjc5YTE2LjYxLDE2LjYxLDAsMCwwLTMuODItOC4yNCw5LjEsOS4xLDAsMCwwLTctMyw5LjQxLDkuNDEsMCwwLDAtNS4zOSwxLjU3LDEzLjA2LDEzLjA2LDAsMCwwLTMuOTEsNC4yLDIxLjMxLDIxLjMxLDAsMCwwLTIuMzcsNi4wOSwzMS40LDMxLjQsMCwwLDAtLjgxLDcuMiwzMi4wNiwzMi4wNiwwLDAsMCwuNzgsNy4yMSwyMCwyMCwwLDAsMCwyLjM0LDUuOTEsMTIuMjIsMTIuMjIsMCwwLDAsMy44OCw0LDEwLjc2LDEwLjc2LDAsMCwwLDEwLjM2LjMxLDEwLjY1LDEwLjY1LDAsMCwwLDMuNjgtMy4zMSwxNS40NiwxNS40NiwwLDAsMCwyLjI3LTUuMTMsMjMuNjEsMjMuNjEsMCwwLDAsLjYzLTYuN0gxMjEuNTlWMTUwaDEyLjc4djE5LjYzaC0xLjYydi04LjUzaC0uMDhhMTMuNzUsMTMuNzUsMCwwLDEtMS42Niw0LDExLjU1LDExLjU1LDAsMCwxLTIuNjEsMywxMS44NSwxMS44NSwwLDAsMS0zLjM1LDEuODgsMTEuMDgsMTEuMDgsMCwwLDEtMy44NC42NywxMS4zOCwxMS4zOCwwLDAsMS02LjEtMS42MywxNC4xMiwxNC4xMiwwLDAsMS00LjQ4LTQuNDMsMjEuMzQsMjEuMzQsMCwwLDEtMi43NS02LjU4QTMzLjQ2LDMzLjQ2LDAsMCwxLDEwNi45NCwxNDkuODFaIgogICAgICBzdHlsZT0iZmlsbDogI2ZmZiIgLz4KICAgIDxwYXRoIGQ9Ik0xMzkuNSwxMjkuNTdoMjAuMzh2Mi4xM0gxNDEuMzd2MTZoMTcuNDF2Mi4xM0gxNDEuMzd2MTcuNjFoMTguNzJ2Mi4xM0gxMzkuNVoiIHN0eWxlPSJmaWxsOiAjZmZmIiAvPgogIDwvZz4KPC9zdmc+',
      alt: ''
    }
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    badge: { control: 'text' },
    href: { control: 'text' },
    description: { control: 'text' }
  }
} satisfies Meta<MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Movie: Story = {
  args: {
    title: '007 - Alvo em Movimento',
    subtitle: '1985',
    href: '/'
  }
};

export const Show: Story = {
  args: {
    title: 'Your honor',
    subtitle: '2 temporadas',
    href: '/',
    badge: 8
  }
};
