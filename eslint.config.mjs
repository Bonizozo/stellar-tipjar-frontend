import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
