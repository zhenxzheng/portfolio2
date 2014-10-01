//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();

//route files to load
var index = require('./routes/index');
var about = require('./routes/about');
var projects = require('./routes/projects');


//database setup - uncomment to set up your database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/zxzdesigns');

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//routes
app.get('/', index.redirect);
app.get('/home', index.view);
app.get('/about', about.view);
app.get('/projects', projects.view);
app.get('/projects/:url', projects.viewProject);

app.post('/about/message',about.saveMessage);

//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});