// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Static output. No UI framework integration on purpose — see S4 in
 * odd/tasks/papa-landing.md. The heaviest page of the site has to be the
 * lightest one, and React/shadcn/Framer Motion would be dead weight here.
 *
 * Frame sets are served from Cloudflare R2 (see S7). Bump the version segment
 * in `src/data/scenes.ts` on every re-export so old frames stay cacheable.
 */
export default defineConfig({
  output: 'static',
  build: {
    // Frames are served from R2, not bundled.
    assets: '_assets',
  },
  vite: {
    build: {
      // The scroll stage owns the whole viewport; no need to inline anything large.
      assetsInlineLimit: 0,
    },
  },
});
