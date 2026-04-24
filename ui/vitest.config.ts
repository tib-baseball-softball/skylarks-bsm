import { coverageConfigDefaults, defineConfig } from "vitest/config"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    globalSetup: "./src/test-globals.ts",
    coverage: {
      provider: "v8",
      exclude: ["build/**", ".svelte-kit/**", "*.config.*", ...coverageConfigDefaults.exclude],
    },
  },
})
