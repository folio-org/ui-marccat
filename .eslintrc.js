module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['@folio/eslint-config-stripes'],
  env: {
    browser: true
  },
  globals: {
    process: true,
    Promise: true
  },
  rules: {
    "padded-blocks":"off",
    "react/prop-types":"off",
    "import/prefer-default-export":"off",
    "arrow-body-style": "off",
    "comma-dangle": "off",
    "react/no-unused-prop-types":"off",
    "import/no-extraneous-dependencies": "off",
    "jsx-quotes": "off",
    "no-console": "warn",
    "prefer-const": "off",
    "react/sort-comp":"off",
    "react/no-deprecated": "off",
    "react/forbid-prop-types": "off"
  }
};
