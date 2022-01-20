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
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': null,
    'string-quotes': 'single',

    'order/properties-alphabetical-order': true
  }
}
