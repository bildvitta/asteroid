const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links'
  ],

  stories: [
    '../**/*.stories.mdx',
    '../**/*.stories.js'
  ],

  webpackFinal: webpack => {
    webpack.plugins.push(
      new ESLintPlugin({ extensions: ['js', 'vue'] })
    )

    return webpack
  }
}