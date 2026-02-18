import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    env: {
      NODE_ENV: "test",
      JWT_ADMIN_SECRET: "test-admin-secret",
      JWT_CONSUMER_SECRET: "test-consumer-secret",
    },
  },
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@database": path.resolve(__dirname, "./src/db"),
    },
  },
});
