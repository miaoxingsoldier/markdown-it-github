var path = require('path')
var fs = require('fs')
var MarkdownIt = require('markdown-it')
var githubPlugin = require('../lib/github.js')

var md = new MarkdownIt().use(githubPlugin)
var input = fs.readFileSync(path.resolve(__dirname, 'index.md'), 'utf-8')
var rendered = md.render(input)

var tpl = fs.readFileSync(path.resolve(__dirname, 'index.html.tpl'), 'utf-8')
var result = tpl.replace('<!-- markdown-it-github-output -->', rendered)

fs.writeFileSync(path.resolve(__dirname, 'index.html'), result)
