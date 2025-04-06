import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Используем FlatCompat для обратной совместимости с конфигурациями ESLint
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),

  // Пользовательские правила
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Стиль кода
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "quotes": ["warn", "single", { "avoidEscape": true }],
      "semi": ["warn", "always"],
      "comma-dangle": ["warn", "always-multiline"],

      // Лучшие практики
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "eqeqeq": ["warn", "always"],
      "prefer-const": "warn",
      "no-var": "warn",
    },
  },
];

export default eslintConfig;