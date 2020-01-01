
var themePlugin = require('markdown-it-theme')
var anchorPlugin = require('./anchor.js')
var taskPlugin = require('./task.js')
var imagePlugin = require('./image.js')

var themeOpts = {
  theme: 'md-github',
  alias: function (theme, tag) {
    return theme + '__' + tag
  }
}
var anchorOpts = {
  theme: 'md-github'
}
var taskOpts = {
  theme: 'md-github'
}
var imageOpts = {
  theme: 'md-github'
}

module.exports = function githubPlugin (md) {
  themePlugin(md, themeOpts)
  anchorPlugin(md, anchorOpts)
  taskPlugin(md, taskOpts)
  imagePlugin(md, imageOpts)
}
