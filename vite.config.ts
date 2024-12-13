import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit(), mkcert()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
