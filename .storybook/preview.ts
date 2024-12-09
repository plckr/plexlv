import type { Preview } from '@storybook/svelte';
import '../src/styles/index.pcss';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'plex',
      values: [{ name: 'plex', value: '#3f4245' }]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
