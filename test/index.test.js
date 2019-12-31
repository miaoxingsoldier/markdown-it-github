/* eslint-env jest */

var MarkdownIt = require('markdown-it')
var githubPlugin = require('../lib/github.js')
var utils = require('./utils.js')

describe('markdown-it-github', () => {
  var theme = 'md-github'
  var md = new MarkdownIt()
    .use(githubPlugin)

  var testcases = utils.getTestCase('index.txt', theme)
  testcases.forEach(testcase => {
    it(testcase.title, () => {
      var result = md.render(testcase.input)
      expect(result.trim()).toBe(testcase.output)
    })
  })
})
