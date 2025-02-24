import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/tests/setup-tests.ts"],
    globals: true,
    environment: "jsdom",
  },
});
