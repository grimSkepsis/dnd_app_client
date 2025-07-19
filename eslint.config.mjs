import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

// Get current file path for ESLint flat config compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat helps bridge legacy ESLint configs with the new flat config format
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  // Extend Next.js ESLint config which includes React, React Hooks, and Core Web Vitals rules
  ...compat.extends("next/core-web-vitals"),
  {
    // Ignore GraphQL generated files from ESLint checks
    ignores: ["src/gql/**/*"],
  },
];

export default eslintConfig;
