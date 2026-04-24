import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig, searchForWorkspaceRoot} from "vite";
import {wuchale} from 'wuchale/vite';

export default defineConfig({
  server: {
    host: "localhost",
  },
  plugins: [wuchale(), sveltekit()],
});
