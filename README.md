

# Simple project for testing ["express-bem-xjst-renderer"](https://github.com/stochastical/express-bem-xjst-renderer) BEM renderer plugin

##Install

```
git clone https://github.com/stochastical/express-bem-xjst-renderer-test.git
cd express-bem-xjst-renderer-test
npm i
npm i --save https://github.com/stochastical/express-bem-xjst-renderer.git
```

##Run

```
node main
```

Run test pages in browser

* http://localhost:8080

* http://localhost:8080/user2

* http://localhost:8080/bemhtml


_Templates_ is in **views** directory

_Some input data_ is in the **data.json**

##Usage

Activate plugin in express in a usual way

```javascript
var renderer = require('express-bem-xjst-renderer')();

app
    .set('views', './views')
    .set('view engine', 'bemtree.js')
    .engine('bemtree.js', renderer)
```
