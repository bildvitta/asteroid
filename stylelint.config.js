module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],

  plugins: [
    'stylelint-order'
  ],

  rules: {
    'at-rule-no-unknown': null,
    'color-function-notation': null,
    'custom-property-pattern': null,
    'function-no-unknown': null, // FIXME: necessário para rodar a documentação.
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': null,
    'string-quotes': 'single',
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-colon-space-before': null,
    'color-hex-case': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/dollar-variable-colon-space-before': null,
    'custom-property-pattern': null,

    // Plugins
    'order/properties-alphabetical-order': true
  }
}
