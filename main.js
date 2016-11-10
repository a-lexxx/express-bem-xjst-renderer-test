'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
// var router = require('./router');

var bemder = require('bemder');

app
	.disable('x-powered-by')
	.set('views', './views')
	.set('view engine', 'bemtree.js')	// "шаблонизатор по умолчанию" для того, чтобы
	.engine('bemtree.js', bemder.render) // чтобы работало res.render('olo') без расширения файла
	// .engine('bemhtml.js', bemder.render) // а вот так не работает
	.engine('js', bemder.render);   // т.к. если указывать res.render('olo.bemhtml.js'),
									// то express совершенно верно думает, что это файлы типа js
									// поэтому нужно регистрировать именно такое расширение 

var data = require('./data.json');

app.get('/', function(req, res, next){
	res.render('some.bemhtml.js', {page: data});
})

app.get('/1', function(req, res, next){
	res.render('some', {page: data[1]});
})

app.get('/2', function(req, res, next){
	res.render('some', {page: data[2]});
})

app.get('*', function(r, rr, n){
	rr.status(404).send('Что-то потеряли? :(');
})

app.use(errorHandler);

 /*eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
	console.log('Error ocurred: ', err);
	res.status(500).json({status: 'Application error, try later'});
}
/*eslint-enable no-alert */

app.listen(8080, function () {
	console.log('listening at %s:%s', 'localhost', 8080);
});

module.exports.app = app;