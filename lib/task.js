
var taskItemType = [
  'list_item_open',
  'paragraph_open',
  'inline'
].join('')

function isTaskItem (tokens, idx) {
  var tokenType = [
    tokens[idx].type,
    tokens[idx + 1].type,
    tokens[idx + 2].type
  ].join('')
  var taskMark = /^\[[ xX]\] /.test(tokens[idx + 2].content)
  return tokenType === taskItemType && taskMark
}

function getTokenCls (theme, type) {
  return [theme, type].join('__')
}

function getParentToken (tokens, idx) {
  var parentLevel = tokens[idx].level - 1
  for (var i = idx - 1; i >= 0; i--) {
    if (tokens[i].level === parentLevel) return tokens[i]
  }
  return null
}

var getTaskFunc = function (theme, Token) {
  var listCls = getTokenCls(theme, 'task-list')
  var itemCls = getTokenCls(theme, 'task-item')
  var checkboxCls = getTokenCls(theme, 'task-checkbox')

  function addCheckbox (tokens, idx) {
    var token = tokens[idx]
    token.children[0].content = token.children[0].content.slice(3)

    var checkboxToken = new Token('checkbox_input', 'input', 0)
    checkboxToken.attrSet('type', 'checkbox')
    checkboxToken.attrSet('disabled', 'true')
    checkboxToken.attrSet('class', checkboxCls)

    var checked = /^\[[xX]\]/.test(token.content)
    if (checked) {
      checkboxToken.attrSet('checked', 'true')
    }

    token.children.unshift(checkboxToken)
  }

  return function (tokens, idx) {
    var listToken = getParentToken(tokens, idx)
    if ((listToken.attrGet('class') || '').indexOf(listCls) === -1) {
      listToken.attrJoin('class', listCls)
    }

    var itemToken = tokens[idx]
    itemToken.attrJoin('class', itemCls)

    addCheckbox(tokens, idx + 2)
  }
}

module.exports = function taskPlugin (md, options = {}) {
  var theme = options.theme
  if (!theme) return

  function travalToken (state) {
    var addTask = getTaskFunc(theme, state.Token)

    var tokens = state.tokens
    tokens.forEach((token, idx) => {
      if (idx + 2 >= tokens.length || !isTaskItem(tokens, idx)) return
      addTask(tokens, idx)
    })
  }

  md.core.ruler.push('github_task', travalToken)
}
