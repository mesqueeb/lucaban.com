module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    'cordova': true,
    'DEV': true,
    'PROD': true,
    '__THEME': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'one-var': 0,
    'import/first': 0,
    'no-tabs': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'semi': 0,
    'key-spacing': 0,
    'comma-dangle': 0,
    'no-irregular-whitespace': 2,
    'eol-last': 1,
    'no-unused-vars': 1,
    'comma-spacing': 1,
    'no-trailing-spaces': 1,
    'keyword-spacing': 1,
    'no-unneeded-ternary': 1,
    'object-curly-even-spacing': 1,
    'object-curly-spacing': 1,
    'no-self-assign': 1,
    'spaced-comment': 0,
    'arrow-spacing': 0,
    'space-infix-ops': 0,
    'no-mixed-spaces-and-tabs': 0,
    'camelcase': 0,
    'quotes': 0,
    'no-undef': 0,
    'eqeqeq': 0,
    'block-spacing': 0,
    'no-extra-bind': 0,
    'no-multiple-empty-lines': 0,
    'space-in-parens': 0,
    'operator-linebreak': 0,
    'padded-blocks': 0,
    'object-property-newline': 0,
    'semi-spacing': 0,
    'no-multi-spaces': 0,
    'no-useless-return': 0,
    'no-use-before-define': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'brace-style': [1, 'allman', { 'allowSingleLine': true }],
  }
}
