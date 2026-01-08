import { fileURLToPath } from "node:url";

import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import reactRefresh from "eslint-plugin-react-refresh";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const baseDirectory = fileURLToPath(new URL(".", import.meta.url));
const compat = new FlatCompat({
  baseDirectory,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
    },
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
      ),
    ),
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  globalIgnores(["**/dist", "**/.eslintrc.cjs", "**/eslint.config.mjs"]),
]);
