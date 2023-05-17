module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
    JSX: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off',

    'no-console': ['warn', { allow: ['tron'] }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',

    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'function-declaration',
      },
    ],
    // TypeScript
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-explicit-any': 'off',

    // mine
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    'no-underscore-dangle': 'off',
    // React
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/prop-types': 'off',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
      'babel-module': {},
    },
  },
};
