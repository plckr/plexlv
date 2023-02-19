const path = require('path');

const preset = require('postcss-preset-env');
const mixins = require('postcss-mixins');

const config = {
	plugins: [
		preset({
			features: {
				'custom-media-queries': {
					importFrom: ['src/styles/custom-media.json']
				},
				'nesting-rules': true,
				'custom-properties': false
			}
		}),
		mixins({
			mixinsDir: path.join(__dirname, 'src/styles/mixins')
		})
	]
};

module.exports = config;
