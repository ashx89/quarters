var ProjectsDAO = require('../objects/projects').ProjectsDAO;

function ContentHandler(db) {

	var projects = new ProjectsDAO(db);

	this.displayLogin = function(req, res, next) {

		return res.render('index', {
			title: 'Login'
		});

	};


	this.displayDashboard = function(req, res, next) {

		projects.getProjects(5, function(err, projects) {

			if (err) throw err;

			return res.render('dashboard', {
				title: 'Dashboard',
				projects: projects
			});

		});

	};


};

module.exports = ContentHandler;