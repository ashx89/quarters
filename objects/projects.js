function ProjectsDAO(db) {

	var projects = db.collection('projects');

	this.newProject = function(title, callback) {

		console.log("creating a new project...");

		var project = { title: title, date: new Date() };

		projects.insert(project, {safe: true}, function(err, doc) {
			if (err) throw err;
			console.log("New project created");
			callback(err, doc);
		});
	};

	this.getProjects = function(num, callback) {

		projects.find().sort('date', -1).limit(num).toArray(function(err, items) {
			if (err) throw err;
			console.log("Found " + items.length + " projects");
			callback(err, items);
		});
	};

};

module.exports.ProjectsDAO = ProjectsDAO;