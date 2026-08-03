// @ts-nocheck
// getViteConfig gives vitest the Astro plugin so .astro files compile.
// testTransformMode forces the SSR build of those components — under the plain
// jsdom (web) transform Astro emits a browser stub that throws on render, since
// .astro components only ever run on the server.
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    testTransformMode: { ssr: ["**/*"] },
  },
});
