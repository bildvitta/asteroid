module.exports = {
  root: true,

  env: {
    browser: true
  },

  parser: 'vue-eslint-parser',

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:quasar/recommended',
    'plugin:asteroid/essential',

    'standard'
  ],

  plugins: [
    'vue',
    'quasar',
    'asteroid'
  ],

  globals: {
    process: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },

  rules: {
    // Global
    'arrow-parens': ['error', 'as-needed'],
    'one-var': ['error', 'never'],
    'multiline-ternary': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-void': 'off',

    // Import
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',

    // Promise
    'prefer-promise-reject-errors': 'off',

    // Recommended
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
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
    'vue/v-slot-style': ['error', 'shorthand'],
  }
}
