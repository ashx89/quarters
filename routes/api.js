var ProjectsDAO = require('../objects/projects').ProjectsDAO;

function APIHandler(db) {

	var projects = new ProjectsDAO(db);

	/* ------------------------------------------------   
     * Project GET
     * ----------------------------------------------- */
	this.getProjects = function(req, res) {

		if (!req.username) res.redirect('/');

		projects.getProjects(0, function(err, items) {
			if (err) throw err;
			return res.json(items);
		});
	};

    this.getProject = function(req, res) {

        if (!req.username) res.redirect('/');

        var id = req.params.id;

        projects.getProject(id, function(err, item) {
            if (err) throw err;
            return res.json(item);
        });
    };


    /* ------------------------------------------------   
     * Project POST
     * ----------------------------------------------- */
    this.handleNewProject = function(req, res, next) {

        var id    = req.body.id;
        var title = req.body.title;

       projects.newProject(id, title, function(err, doc) {
            if (err) return next(err);
            res.json(doc[0]);
        }); 

    };


    /* ------------------------------------------------   
     * Tasks
     * ----------------------------------------------- */
    this.getTasks = function(req, res) {

        if (!req.username) res.redirect('/');

        var id = req.params.id;

        projects.getTasks(id, function(err, tasks) {
            if (err) throw err;
            if (tasks == null) return;
            return res.json(tasks);
        });
    };

    this.handleNewTask = function(req, res, next) {

        var pid   = req.body.projectid.toString();
        var id    = req.body.id;
        var title = req.body.title;

        projects.newTask(pid, id, title, function(err, doc) {
            if (err) return next(err);
            return res.json(doc.tasks);
        }); 

    };

    this.updateTask = function(req, res, next) {

        var id     = req.body._id;
        var status = req.body.completed;

        projects.updateTask(id, status, function(err, doc) {
            if (err) return next(err);
            return res.json(doc.tasks[0]);
        }); 

    };

    this.deleteTask = function(req, res, next) {

        var id  = req.params.id;
        var tid = req.params.tid;

        projects.deleteTask(id, tid, function(err, doc) {
            if (err) return err;
            return res.json(doc.tasks);
        });
    };


};

module.exports = APIHandler;