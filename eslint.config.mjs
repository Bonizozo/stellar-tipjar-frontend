import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    ".next",
    "out",
    "build",
    "next-env.d.ts",
    ".storybook",
    "coverage",
    "node_modules",
    "dist",
    "*.config.js",
    "*.config.mjs",
    "public/**",
  ]),
]);
