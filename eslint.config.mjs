import js from '@eslint/js';
import wordpress from '@wordpress/eslint-plugin';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      'app/public/**',
      '**/*.min.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['src/blocks/**/*-admin.js', 'tasks/**'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {jsx: true},
      },
      globals: {
        ...globals.browser,
        ...globals.jquery,
        phpVars: 'readonly',
      },
    },
  },
  {
    files: ['tasks/**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'max-len': [
        'warn',
        {
          code: 120,
        },
      ],
    },
  },
  ...wordpress.configs['recommended-with-formatting'].map((config) => ({
    ...config,
    files: ['src/blocks/**/*.js'],
  })),
];
