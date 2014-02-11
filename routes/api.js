var ProjectsDAO = require('../objects/projects').ProjectsDAO;

function APIHandler(db) {

	var projects = new ProjectsDAO(db);

	// API calls made by client
	this.getProjects = function(req, res) {

		if (!req.username) res.redirect('/');

		projects.getProjects(0, function(err, items) {
			if (err) throw err;
			return res.json(items);
		});
	};

};

module.exports = APIHandler;