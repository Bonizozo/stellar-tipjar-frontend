import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
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
];

export default eslintConfig;
