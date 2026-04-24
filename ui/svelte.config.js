import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],
  compilerOptions: {
    experimental: {
      async: true,
    }
  },
  kit: {
    adapter: adapter({
      fallback: "index.html",
      pages: "../public",
    }),
    csp: {
      directives: {
        "default-src": [
          "self",
          "*.baseball-softball.de",
          "*.tib-baseball.de",
          "*.berlinskylarks.de",
        ],
        "connect-src": [
          "self",
          "https://*.baseball-softball.de",
          "https://tib-baseball.de",
          "https://*.tib-baseball.de",
          "https://*.berlinskylarks.de",
          "https://*.ddev.site",
          "http://127.0.0.1:8090",
        ],
        "img-src": [
          "self",
          "data: w3.org/svg/2000",
          "https://*.baseball-softball.de",
          "https://*.tib-baseball.de",
          "https://*.berlinskylarks.de",
          "https://*.ddev.site",
          "http://127.0.0.1:8090",
          "https://*.tile.openstreetmap.de",
        ],
        "script-src": ["self"],
        "script-src-elem": ["self"],
        "style-src": ["self", "unsafe-inline"],
        "frame-ancestors": ["none"],
        "frame-src": [
          "*"
        ]
      },
    },
  },
};
export default config;
