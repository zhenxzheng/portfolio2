
var Mongoose = require('mongoose');

var MessageSchema = new Mongoose.Schema({
  // fields are defined here
  	"name": String,
	"email": String,
	"date": Date,
	"message": String
});

exports.Message = Mongoose.model('Message', MessageSchema);


