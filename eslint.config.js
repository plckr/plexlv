import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/*.cjs',
      '**/.DS_Store',
      'node_modules',
      'build',
      '.svelte-kit',
      '!.storybook',
      'package',
      '.env',
      '.env.*',
      '!.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      'src/i18n/i18n-svelte.ts',
      'src/i18n/i18n-util.async.ts',
      'src/i18n/i18n-util.sync.ts',
      'src/i18n/i18n-util.ts'
    ]
  },
  eslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node
      },
      sourceType: 'module',
      parserOptions: { extraFileExtensions: ['.svelte'] }
    },
    rules: {
      'no-unreachable': 'warn',
      '@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
      ],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      'no-empty': ['error']
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tsParser, project: './tsconfig.json' }
    },
    plugins: { svelte: eslintPluginSvelte },
    processor: 'svelte/svelte',
    rules: {
      'svelte/block-lang': ['error', { script: 'ts', style: ['postcss', null] }]
    }
  }
);
