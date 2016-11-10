
##Тестовый проект для проверки работоспособности плагина-шаблонизатора BEM

Не забываем 
```
git clone https://github.com/stochastical/bemder-test.git
git clone https://github.com/stochastical/bemder.git
cd bemder-test
npm i
npm i ../bemder
node main
```

Потом в браузере 

* http://localhost:8080

* http://localhost:8080/1

* http://localhost:8080/2


_Шаблоны_ в папке **views**,
_данные_ в файле **data.json**


Подключение шаблонизатора в express стандартным способом

```javascript
var bemder = require('bemder');

app
	.set('views', './views')
	.set('view engine', 'bemtree.js')
	.engine('bemtree.js', bemder.render)
```