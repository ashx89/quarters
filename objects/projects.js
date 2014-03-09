function ProjectsDAO(db) {

	var projects = db.collection('projects');


	/* ------------------------------------------------   
     * New Project
     * ----------------------------------------------- */
	this.newProject = function(id, title, callback) {

		console.log("creating a new project...");

		var project = {_id: id, title: title, date: new Date(), tasks: [] };

		projects.insert(project, {safe: true}, function(err, doc) {
			if (err) throw err;
			console.log("New project created");
			callback(err, doc);
		});
	};

	/* ------------------------------------------------   
     * Get All Projects
     * ----------------------------------------------- */
	this.getProjects = function(num, callback) {
		projects.find().sort('date', -1).limit(num).toArray(function(err, items) {
			if (err) throw err;
			console.log("Found " + items.length + " projects");
			callback(err, items);
		});
	};

	/* ------------------------------------------------   
     * Get Single Project - (can't find by objectID)
     * ----------------------------------------------- */
	this.getProject = function(id, callback) {
		projects.find({_id: id}, function(err, item) {
			if (err) throw err;
			callback(err, item);
		});
	};


	/* ------------------------------------------------   
     * Get All Tasks
     * ----------------------------------------------- */
	this.getTasks = function(id, callback) {
		projects.findOne({_id: id}, function(err, docs) {
			if (err) throw err;
			if (docs == null) return callback(err, null);
			callback(err, docs.tasks);
		});
	};

	/* ------------------------------------------------   
     * New Task
     * ----------------------------------------------- */
	this.newTask = function(pid, id, title, callback) {

		console.log("creating a new task...");

		var query 	 = {_id: pid};
		var task 	 = {_id: id, title: title, date: new Date(), completed: false };
		var operator = {$push: {tasks: task}};

		projects.findAndModify(query, {}, operator, {new: true, remove: false}, function(err, doc) {
			if (err) throw err;
			console.log("New task created");

			projects.findOne(query, {'tasks': {$elemMatch: {_id: id}}}, function(err, doc) {
				if (err) throw err;
				callback(err, doc);
				task = {};
			})
		});
	};

	/* ------------------------------------------------   
     * New Task
     * ----------------------------------------------- */
	this.updateTask = function(id, status, callback) {

		var id = id.toString();
		var operator = {$set: {'tasks.$.completed': status}};

		projects.update({'tasks._id': id}, operator, {'upsert': false}, function(err, doc) {

			projects.findOne({'tasks._id': id}, {'tasks.$': 1}, function(err, doc) {
				if (err) throw err;
				console.log('fo----------------', doc);
				callback(err, doc);
			});
			
		});
	};


};

module.exports.ProjectsDAO = ProjectsDAO;