// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://research.vyde.dev',
  trailingSlash: 'never',
  build: { format: 'directory' },
});
