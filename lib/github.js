
var themePlugin = require('markdown-it-theme')

var themeOpts = {
  theme: 'md-github',
  alias: function (theme, tag) {
    return theme + '__' + tag
  }
}

module.exports = function githubPlugin (md) {
  themePlugin(md, themeOpts)
}
