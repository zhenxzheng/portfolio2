//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var favicon = require('serve-favicon');
var app = express();

//route files to load
var index = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');
var projects = require('./routes/projects');
var instagram = require('./routes/instagram');

//database setup - uncomment to set up your database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/zxzdesigns');

//load environment variables
var dotenv = require('dotenv');
dotenv.load();

//add instagram api setup
var ig = require('instagram-node-lib');
ig.set('client_id', process.env.instagram_client_id);
ig.set('client_secret', process.env.instagram_client_secret);

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());


//routes
app.get('/', index.redirect);
app.get('/home', index.view);
app.get('/about', about.view);
app.get('/contact', contact.view);
app.get('/projects', projects.view);
app.get('/projects/:url', projects.viewProject);
app.get('/messages', contact.viewMessage);
app.get('/instagram', instagram.view);

app.post('/messages/new', contact.saveMessage);

//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

// ig.users.recent({user_id:4603130});