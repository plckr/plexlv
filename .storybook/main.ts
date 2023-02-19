import type { StorybookConfig } from '@storybook/sveltekit';
import { mergeConfig } from 'vite';

const path = require('path');

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			resolve: {
				alias: {
					$lib: path.resolve(process.cwd(), './src/lib')
				}
			}
		});
	}
};
export default config;
