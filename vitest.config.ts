/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],

  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: [
      'ui/src/helpers/**/*.{js,ts}',
      'ui/src/components/**/*.{js,ts}'
    ],

    alias: {
      asteroid: path.resolve(__dirname, 'ui/src/asteroid.js'),
      'vue-router': path.resolve(__dirname, 'docs/node_modules/vue-loader'),
      test: path.resolve(__dirname, '/test'),
      quasar: 'quasar/dist/quasar.esm.prod.js'
    }
  }
})
