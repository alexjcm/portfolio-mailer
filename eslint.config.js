const babelParser = require('@babel/eslint-parser');
const eslintImportErrors = require('eslint-plugin-import/config/errors');
const eslintRecommended = require('@eslint/js/src/configs/eslint-recommended');
const eslintImportWarnings = require('eslint-plugin-import/config/warnings');
const globals = require('globals');

module.exports = [
  eslintRecommended,
  {
    ignores: ['**/*.config.js', '.prettierrc.js'],
  },
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs'],
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        browser: true,
        ...globals.es2017,
        es2017: true,
        ...globals.node,
        node: true,
      },
      ecmaVersion: 2017,
      parser: babelParser,
      // parserOptions: {
      //   ecmaVersion: 2017,
      //   //sourceType: 'module',
      // },
    },
    plugins: [eslintImportErrors, eslintImportWarnings],
    files: ['src/**/*.js'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'off',
    },
  },
];
