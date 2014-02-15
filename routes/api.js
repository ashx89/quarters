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

        console.log("User submitted title: " + title);

        var title = req.body.title;

       projects.newProject(title, function(err, doc) {
            if (err) return next(err);
            console.log('new project added to collection');
            res.send(doc[0]);
        }); 

    };

};

module.exports = APIHandler;