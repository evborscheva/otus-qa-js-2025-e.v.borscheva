import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
    languageOptions: { globals: globals.node,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
     } }},
  {
    ...playwright.configs['flat/recommended'],
    files: ['e2e/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off'
    }
  },
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  globalIgnores(['reports/**', 'node_modules/**', 'coverage/**', 'playwright-report', 'test-results']),
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]);
