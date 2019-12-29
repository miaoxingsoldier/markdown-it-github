# markdown-it-github

> A [markdown-it] plugin generate github style markdown.

[markdown-it]: https://github.com/markdown-it/markdown-it

## Usage

> index.md

```markdown
# This is an H1
+ Red
+ Green
+ Blue
```

> index.js

```js
var fs = require('fs')
var plugin = require('markdown-it-github')
var md = require('markdown-it')().use(plugin)
var input = fs.readFileSync('index.md', 'utf-8')
var result = md.render(input)
console.log(result)
```

> Result

```html
<h1 class="md-github md-github__h1">This is an H1</h1>
<ul class="md-github md-github__ul">
<li class="md-github md-github__li">Red</li>
<li class="md-github md-github__li">Green</li>
<li class="md-github md-github__li">Blue</li>
</ul>
```
