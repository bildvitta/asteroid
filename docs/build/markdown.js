const MarkdownIt = require('markdown-it')

const markdownPluginCode = require('./markdown-plugin-code.js')
const markdownPluginHeading = require('./markdown-plugin-heading.js')

const highlight = require('./markdown-highlight.js')

const markdownOptions = {
  highlight,
  html: true,
  typographer: true
}

const markdown = new MarkdownIt(markdownOptions)
  .use(markdownPluginCode)
  .use(markdownPluginHeading)

const matter = require('gray-matter')
const toml = require('toml')

const getVueComponent = function (source) {
  const { data, content } = parseFrontMatter(source)

  return `
    <template>
      <doc-page v-bind="attrs">${markdown.render(content)}</doc-page>
    </template>

    <script>
      export default {
        computed: {
          attrs () { return ${JSON.stringify(data)} }
        }
      }
    </script>
  `
}

const parseFrontMatter = function (content) {
  return matter(content, {
    engines: {
      excerpt: false,
      toml: toml.parse.bind(toml)
    },

    excerpt_separator: '<!-- more -->'
  })
}

module.exports.getVueComponent = getVueComponent
module.exports.parseFrontMatter = parseFrontMatter
