// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Vercel, we cannot ship a Cloudflare Worker bundle — disable the CF adapter
// so the build produces a plain Node-compatible SSR entry under dist/server/index.js
// that the Vercel serverless function in /api/server.mjs can invoke.
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  cloudflare: isVercel ? false : undefined,
});
