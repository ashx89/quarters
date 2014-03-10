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

        var pid      = req.body.projectid.toString();
        var id       = req.body.id;
        var title    = req.body.title;
        var deadline = req.body.deadline;

        var tags  = req.body.tags.split(',');

        projects.newTask(pid, id, title, tags, deadline, function(err, doc) {
            if (err) return next(err);
            return res.json(doc.tasks);
        }); 

    };

    this.updateTask = function(req, res, next) {

        var id     = req.body._id;
        var status = req.body.completed;

        projects.updateTask(id, status, function(err, doc) {
            if (err) return next(err);
            return res.json(doc.tasks);
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

    /* ------------------------------------------------   
     * Comments
     * ---------------------------------------------- */
     this.getComments = function(req, res) {

        if (!req.username) res.redirect('/');

        var id = req.params.id;

        projects.getComments(id, function(err, tasks) {
            if (err) throw err;
            if (tasks == null) return;
            return res.json(tasks);
        });
    };

     this.handleNewComment = function(req, res, next) {

        console.log("creating a new comment...");

        var tid     = req.body.taskId;
        var id      = req.body.id;
        var comment = req.body.text;

        projects.newComment(tid, id, comment, function(err, doc) {
            if (err) return err;
            return res.json(doc.tasks);
        });
    };

    this.deleteComment = function(req, res, next) {

        var id  = req.params.id;
        var cid = req.params.cid;

        projects.deleteComment(id, cid, function(err, doc) {
            if (err) return err;
            return res.json(doc.tasks);
        });
    };


};

module.exports = APIHandler;