import path from 'path';
import type { StorybookConfig } from '@storybook/sveltekit';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: [
    '@storybook/addon-svelte-csf',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {},
  async viteFinal(config) {
    config = workaroundSvelteDocgenPluginConflictWithUnpluginIcons(config);

    return mergeConfig(config, {
      plugins: [
        Icons({
          compiler: 'svelte',
          iconCustomizer(collection, _icons, props) {
            if (collection === 'plex') {
              props.width = 'auto';
              props.height = 'auto';
            }
          },
          customCollections: {
            plex: FileSystemIconLoader('./src/components/ui/icons')
          }
        })
      ],
      resolve: {
        alias: {
          $app: path.resolve(process.cwd(), './__mocks__/$app'),
          $components: path.resolve(process.cwd(), './src/components'),
          $lib: path.resolve(process.cwd(), './src/lib'),
          $params: path.resolve(process.cwd(), './src/params'),
          $types: path.resolve(process.cwd(), './src/types'),
          $styles: path.resolve(process.cwd(), './src/styles')
        }
      }
    });
  }
};
export default config;

// https://github.com/storybookjs/storybook/issues/20562
/**
 * @param {import('vite').InlineConfig} config
 */
const workaroundSvelteDocgenPluginConflictWithUnpluginIcons = (config) => {
  if (!config.plugins) return config;

  const [_internalPlugins, ...userPlugins] = config.plugins;
  const docgenPlugin = userPlugins.find(
    (plugin) => plugin.name === 'storybook:svelte-docgen-plugin'
  );
  if (docgenPlugin) {
    const origTransform = docgenPlugin.transform;
    const newTransform = (code, id, options) => {
      if (id.startsWith('~icons/')) {
        return;
      }
      return origTransform?.call(docgenPlugin, code, id, options);
    };
    docgenPlugin.transform = newTransform;
    docgenPlugin.enforce = 'post';
  }
  return config;
};
