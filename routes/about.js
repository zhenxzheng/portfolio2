var models = require('../models');

exports.view = function(req, res) {
	res.render('about');
}

exports.saveMessage = function(req, res) {
	var form_data = req.body;
	console.log(form_data);

	// var newMessage = new models.Message(form_data);
	// newMessage.save(afterSaving);

	function afterSaving(err) {
		if(err){
			console.log(err);
			res.send(500);
		}
		res.redirect('/about');
		console.log("sent");
	}
}