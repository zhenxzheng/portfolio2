var data = require('../projects.json');


exports.view = function(req, res) {
	res.render('projects',data);
}
// exports.viewProject = function(req,res){
// 	var url = req.params.url;
// 	var project = getProjectData(url);
// 	res.render('default',project);
// }

// function getProjectData(url){
// 	var key;
// 	for(key in data.projects){
// 		if(data.projects.hasOwnProperty(key)){
// 			var project = data.projects[key];
// 			if (project["url"] == url){
// 				return project;
// 			}
// 		}
// 	}
// }

exports.viewProject = function(req,res) {
	var url = req.params.url;
	res.render(url);
	// res.render('ActivityViz');
	// res.render('UCSDMap');
	// res.render('OnMyBlock');
	// res.render('Portfolio1');
	// res.render('Resume');
	// res.render('Cognection');
	// res.render('PNG');
	// res.render('DB');
}