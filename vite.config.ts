// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck To be removed when vitest supports vite 6
import { sveltekit } from '@sveltejs/kit/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    mkcert(),
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
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
