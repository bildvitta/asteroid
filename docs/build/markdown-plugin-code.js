module.exports = function (markdown) {
  const defaultRender = markdown.renderer.rules.code_block

  markdown.renderer.rules.code_block = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrSet('class', 'doc-code-block')

    return defaultRender(tokens, idx, options, env, self)
  }
}
