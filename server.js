//Configuracion Inicial
var express = require('express');
var app = express(); 						
var mongoose = require('mongoose'); 
var port = process.env.PORT || 8080; 	
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.remoteUrl);

app.use(express.static('./public')); 
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);
