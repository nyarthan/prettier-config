import { defineConfig } from "./src/index.ts";

export default defineConfig({
  plugins: {
    importOrder: {
      enabled: true,
    },
  },
});
