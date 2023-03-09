import '../src/styles/index.pcss';

export const parameters = {
  backgrounds: {
    default: 'plex',
    values: [
      {
        name: 'plex',
        value: '#3f4245'
      }
    ]
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
