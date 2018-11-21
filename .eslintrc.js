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
    browser: true,
    jest: true
  },
  globals: {
    Promise: true,
  },
  plugins: ["jsx-a11y" , "import"],
  "rules": {		
		"indent": ["error", 2],
    "react/jsx-indent": ["error", 2],
		"react/forbid-prop-types":"off",
		"spaced-comment": ["error", "always", { "markers": ["/"] }],
    "arrow-parens": "off",
    "no-return-assign":"off",
    "no-undef": "warn",
    "import/no-named-as-default": "off",
    "import/no-extraneous-dependencies": "off",
		"react/sort-comp": "off",
    "prefer-destructuring": [
      "error",
      {
          "VariableDeclarator": {
              "array": false,
              "object": true
          },
          "AssignmentExpression": {
              "array": true,
              "object": false
          }
      },
      {
          "enforceForRenamedProperties": false
      }
  ]
	}
}