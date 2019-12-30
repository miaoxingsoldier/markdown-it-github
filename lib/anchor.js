var GithubSlugger = require('github-slugger')
var slugger = new GithubSlugger()

var anchorSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'

var getAnchorCls = function (theme) {
  return [theme, 'anchor'].join('__')
}

var getAnchorIcon = function (theme) {
  const iconCls = ['octicon', 'octicon-link'].map(cls => [theme, cls].join('__')).join(' ')
  return anchorSvg.replace('<svg', '<svg class="' + iconCls + '"')
}

var getAnchorFunc = function (theme, Token) {
  var anchorCls = getAnchorCls(theme)
  var anchorIcon = getAnchorIcon(theme)

  return function (tokens, idx) {
    var children = tokens[idx + 1].children
    if (!children || !children.length) return

    const title = children
      .map(c => typeof c.content === 'string' ? c.content : '')
      .join('')
      .replace(/\s/g, '-')

    var anchor = slugger.slug(title)

    var anchorOpen = new Token('link_open', 'a', 1)
    anchorOpen.attrSet('class', anchorCls)
    anchorOpen.attrSet('name', anchor)
    anchorOpen.attrSet('href', '#' + anchor)

    var anchorContent = new Token('html_block', '', 0)
    anchorContent.content = anchorIcon

    var anchorClose = new Token('link_close', 'a', -1)

    children.unshift(anchorOpen, anchorContent, anchorClose)
  }
}

module.exports = function anchorPlugin (md, options = {}) {
  var theme = options.theme
  if (!theme) return

  function travalToken (state) {
    var addAnchor = getAnchorFunc(theme, state.Token)

    var tokens = state.tokens
    tokens.forEach((token, idx) => {
      if (token.type !== 'heading_open') return
      addAnchor(tokens, idx)
    })
  }

  md.core.ruler.push('github_anchor', travalToken)
}
