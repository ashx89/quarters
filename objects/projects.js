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
	this.newTask = function(pid, id, title, tags, deadline, callback) {

		console.log("creating a new task...");

		var query 	 = {'_id': pid};
		var task 	 = {
						 '_id': id, 
						 title: title, 
						 date: new Date(),
						 tags: tags,
						 deadline: deadline,
						 completed: false 
						};
						
		var operator = {'$push': {'tasks': task}};

		projects.update(query, operator, {'upsert': false}, function(err, doc) {

			projects.findOne({'_id': pid}, function(err, doc) {
				if (err) throw err;
				callback(err, doc);
			});
			
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
				console.log(doc)
				callback(err, doc);
			});

		});
	};

	this.deleteTask = function(pid, id, callback) {

		var pid = pid.toString();
		var id  = id.toString();

		projects.findOne({'tasks._id': id}, {'tasks.$': 1}, function(err, doc) {
			
			if (err) throw err;

			projects.update({'_id': pid}, {'$pull': {'tasks': {'_id': id} } }, function(err, doc) {
				if (err) throw err;

				projects.findOne({'_id': pid}, function(err, doc) {
					if (err) throw err;
					callback(null, doc);
				});

			});
		});
	};

	/* ------------------------------------------------   
     * New Comment
     * ----------------------------------------------- */
     this.newComment = function(tid, id, comment, callback) {

		console.log("creating a new comment...");

		var query 	 = {'tasks._id': tid};
		var comment  = {
						 '_id': id, 
						 text: comment, 
						 date: new Date()
						};
						
		var operator = {'$push': {'tasks.$.comments': comment}};

		projects.update(query, operator, {'upsert': false}, function(err, doc) {

			projects.findOne({'tasks._id': tid}, {'tasks.$': 1}, function(err, doc) {
				if (err) throw err;
				callback(err, doc);
			});
			
		});
	};

	this.getComments = function(id, callback) {
		projects.findOne({'tasks._id': id}, {'tasks.$': 1}, function(err, docs) {
			if (err) throw err;
			if (docs == null) return callback(err, null);
			callback(err, docs.tasks[0].comments);
		});
	};

	this.deleteComment = function(id, cid, callback) {

		var cid = cid.toString();
		var id  = id.toString();

		projects.findOne({'tasks._id': id}, {'tasks.$': 1}, function(err, doc) {
			
			if (err) throw err;

			projects.update({'tasks._id': id}, {'$pull': {'tasks.$.comments': {'_id': cid} } }, function(err, doc) {
				if (err) throw err;

				projects.findOne({'tasks._id': id}, function(err, doc) {
					if (err) throw err;
					callback(null, doc);
				});

			});
		});

	};

};

module.exports.ProjectsDAO = ProjectsDAO;