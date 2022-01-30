const path = require('path')
const requireIndex = require('requireindex')

module.exports = {
  rules: requireIndex(path.join(__dirname, '/rules')),
  configs: requireIndex(path.join(__dirname, '/configs'))
}
