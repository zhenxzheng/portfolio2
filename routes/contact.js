var models = require('../models');

exports.view = function(req, res) {
	res.render('contact');
}

exports.viewMessage = function(req,res){
	models.Message
		.find()
		.sort('date')
		.exec(renderMessages);
	function renderMessages(err, messages){
		// res.render('messages',{'messages':messages});
		res.json(messages);
	}
}

exports.saveMessage = function(req, res) {
	var form_data = req.body;

	var newMessage = new models.Message(form_data);
	newMessage.save(afterSaving);

	function afterSaving(err) {
		if(err){
			console.log(err);
			res.send(500);
		}
		res.redirect('/contact');
	}
}