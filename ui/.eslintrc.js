const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  extends: [
    'standard',
    'plugin:vue/vue3-recommended'
  ],

  plugins: [
    'vue',
  ],

  rules: {
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',

    'arrow-parens': ['error', 'as-needed'],
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

    // Recommended
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // Uncategorized
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/attributes-order': ['error', { alphabetical: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/no-reserved-component-names': ['error'],
    'vue/script-indent': ['error'],
    'vue/static-class-names-order': ['error'],
    'vue/v-slot-style': ['error', 'shorthand']
  }
}
