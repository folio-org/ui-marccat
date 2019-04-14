module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ["@folio/eslint-config-stripes"],
  env: {
    browser: true
  },
  globals: {
    process: true,
    Promise: true
  },
  "rules": {		
		"indent": ["error", 2],
    "react/jsx-indent": ["error", 2],
		"react/forbid-prop-types":"off",
    "spaced-comment": ["error", "always", { "markers": ["/"] }],
    "arrow-parens": "off",
    "no-return-assign":"off",
    "no-alert":"off",
    "guard-for-in": "off",
    "jsx-a11y/no-noninteractive-element-interactions":"off",
    "no-undef": "warn",
    "object-curly-newline": "off",
    "import/no-named-as-default": "off",
    "import/no-extraneous-dependencies": "off",
    "react/sort-comp": "off",
    "react/prop-types" : "off",
    "react/destructuring-assignment": ["error"],
	}
}