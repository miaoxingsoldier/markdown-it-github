var imageItemType = [
  'paragraph_open',
  'inline',
  'image',
  'paragraph_close'
].join('')

function isImageItem (tokens, idx) {
  var token = tokens[idx]
  if (!token.children || !token.children.length) return false

  var tokenType = [
    tokens[idx - 1].type,
    token.type,
    token.children[0].type,
    tokens[idx + 1].type
  ].join('')
  return tokenType === imageItemType
}

var getImageFunc = function (theme, Token) {
  return function addLink (tokens, idx) {
    var token = tokens[idx]

    var imageToken = token.children[0]
    imageToken.attrSet('style', 'max-width:100%;')

    var linkOpen = new Token('link_open', 'a', 1)
    linkOpen.attrSet('class', theme + '__a')
    linkOpen.attrSet('target', '_blank')
    linkOpen.attrSet('href', imageToken.attrGet('src'))

    var linkClose = new Token('link_close', 'a', -1)

    token.children.unshift(linkOpen)
    token.children.push(linkClose)
  }
}

module.exports = function imagePlugin (md, options = {}) {
  var theme = options.theme
  if (!theme) return

  function travalToken (state) {
    var addImage = getImageFunc(theme, state.Token)

    var tokens = state.tokens
    tokens.forEach((token, idx) => {
      if (idx < 1 || idx + 1 >= tokens.length || !isImageItem(tokens, idx)) return
      addImage(tokens, idx)
    })
  }

  md.core.ruler.push('github_image', travalToken)
}
