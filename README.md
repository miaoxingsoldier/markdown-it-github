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
<h1 class="md-github md-github__h1"><a class="md-github__anchor" name="this-is-an-h1" href="#this-is-an-h1"><svg class="md-github__octicon md-github__octicon-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>This is an H1</h1>
<ul class="md-github md-github__ul">
<li class="md-github md-github__li">Red</li>
<li class="md-github md-github__li">Green</li>
<li class="md-github md-github__li">Blue</li>
</ul>
```

### style

You can import [github.css](https://github.com/miaoxingsoldier/markdown-it-github/tree/master/lib/github.css) to replicates the github markdown style:

- add `github.css` stylesheet
- add `md-github__body` class to the container
- set a width for the container

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="github.css">
  <style>
    .md-github__body {
      min-width: 200px;
      max-width: 980px;
    }
  </style> 
</head>
<body>
  <div class="md-github__body"><!-- markdown-it-github-output --></div>
</body>
</html>
```
