'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

var renderer = require('express-bem-xjst-renderer')({
    debug: true,
    precompileDir: 'views'
});

app
    .set('views', './views')
    .set('view engine', 'bemtree.js')       // define default "render plugin" with file extension "bemtree.js"
                                            // to use res.render('olo') without file extension
    .engine('bemtree.js', renderer)    // register renderer plugin itself
    // .engine('bemhtml.js', renderer) // <- useless because express use file extension to routing (and here "js" is a file extension)
    .engine('js', renderer);           // you have to use "js" as extension to render bemhtml files like
                                            //          res.render('olo.bemhtml.js'),
                                            // this concerned to express behavior with file extensions and render engines


app.use(morgan('dev'));


var data = require('./data.json');

app.locals.block = 'root';

app.get('/', function(req, res, next) {     // eslint-disable-line no-unused-vars
    res.render('example',                   // here example.bemtree.js and example.bemhtml.js will be used to render
        {
            page: data,
            block: 'root'
        }
    );
});

app.get('/user2', function(req, res, next) {    // eslint-disable-line no-unused-vars
    res.render('example', {page: data[1]});
});


var dataExample2 = ([
    { block: 'link', content: 'Some link'},
    { tag: 'br' },
    { block: 'link', url: '/', content: 'Here link', url: '/bemhtml' },
    { tag: 'br' },
    { block: 'link', target: '_blank', url: '/', content: 'Link to blank' },
    { tag: 'br' },
    { block: 'link', mods: { disabled: true }, url: '/', content: 'Link to site root' }
]);
app.get('/bemhtml', function(req, res, next) {    // eslint-disable-line no-unused-vars
    res.render('example2.bemhtml.js',           // if you are using bemhtml only (i.e. file example2.bemtree.js don't exist)
        {bemjson: dataExample2}                 //  then you should set bemjson explicitly in your data
    );
});

app.get('*', function(req, res, next) {     // eslint-disable-line no-unused-vars
    res.status(404).send('Something lost? :(');
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {    // eslint-disable-line no-unused-vars
    console.log('Error ocurred: ', err);
    res.status(500).json({status: 'Application error, please, try again later'});
}

app.listen(8080, function() {
    console.log('listening at %s:%s', 'localhost', 8080);
});

module.exports.app = app;
