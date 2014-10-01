exports.redirect = function(req, res) {
	res.redirect('/home');
}

exports.view = function(req, res) {
	res.render('index');
}