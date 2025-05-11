import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-console": "warn", // Warn when console statements are used
      eqeqeq: ["error", "always"], // Enforce strict equality
      curly: "error", // Require curly braces for all control statements
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused variables starting with _
      semi: ["error", "always"],
      // quotes: ["error", "single"],
      
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
]);

// This ESLint configuration is set up to lint JavaScript files using the recommended rules from the ESLint core ruleset.
