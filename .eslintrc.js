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
    process: true,
    Promise: true,
  },
  plugins: ["jsx-a11y" , "import"],
  "rules": {		
		"indent": ["error", 2],
		"react/jsx-indent": ["error", 2],
		"import/prefer-default-export": ["warn", 1],
		"react/jsx-indent-props": "off",
		"react/jsx-no-bind": "off",
		"react/prop-types": "off",
		"react/forbid-prop-types":"off",
		"react/jsx-filename-extension": "off",
		"global-require": "off",
		"spaced-comment": ["error", "always", { "markers": ["/"] }],
		"arrow-parens": "off",
		"linebreak-style": "off",
		"no-undef": "warn",
		"react/prefer-stateless-function": "off",
		"import/no-named-as-default": "off",
		"react/no-unused-prop-types": "off",
		"object-curly-newline": "off",
		"no-underscore-dangle": "off",
		"no-plusplus": "off",
		"jsx-a11y/anchor-is-valid":"off",
		"react/sort-comp": "off",
		"no-mixed-operators": "off",
		"class-methods-use-this": "off",
		"no-return-assign": "off",
		"no-multi-assign": "off",
		"no-use-before-define": "off",
		"react/no-multi-comp": "off",
		"prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": false,
        "object": true
      },
      "AssignmentExpression": {
        "array": true,
        "object": false
      }
    }, {
      "enforceForRenamedProperties": false
    }]
	},
	"globals": {
		"$Keys": true
	}
}