const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

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
    webpack.module.rules.push({
      include: path.resolve(__dirname, '../'),
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          additionalData: '@import \'quasar/src/css/variables.sass\';',
          sourceMap: true
        }
      }],
    })

    webpack.plugins.push(
      new ESLintPlugin({ extensions: ['js', 'vue'] })
    )

    return webpack
  }
}