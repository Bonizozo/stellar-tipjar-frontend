import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react/no-unescaped-entities": "warn",
      "@next/next/no-img-element": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/use-memo": "warn",
      "react-hooks/immutability": "warn",
      "@next/next/no-assign-module-variable": "warn",
      "react-hooks/static-components": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "@typescript-eslint/no-this-alias": "warn",
    },
  },
  {
    // Prevent direct process.env reads outside the config module.
    // All env access must go through @/config/env exports.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/config/env.ts", "src/config/index.ts", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"],
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: "MemberExpression[object.name='process'][property.name='env']",
          message:
            "Direct process.env access is not allowed outside src/config/env.ts. Import from '@/config/env' instead.",
        },
      ],
    },
  },
  {
    // `no-explicit-any` burn-down, phase 1 (see docs/lint-burndown.md).
    // src/services/** and src/store/** own real request/response and persisted-state
    // shapes, so an `any` there is the likeliest place for a bad shape to slip past the
    // type checker silently. These directories are held to "error" so no new `any` can
    // land in them while the rest of the codebase is still being cleaned up under "warn".
    // Test files are excluded for now (lowest priority in the burn-down plan) and stay
    // at the global "warn" level.
    files: ["src/services/**/*.{ts,tsx}", "src/store/**/*.{ts,tsx}"],
    ignores: ["**/*.test.ts", "**/*.test.tsx", "**/__tests__/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
