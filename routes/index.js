var SessionHandler 	= require('./session')
  , APIHandler 		= require('./api');
  

module.exports = exports = function(app, db) {

	var sessionHandler = new SessionHandler(db);
	var apiHandler 	   = new APIHandler(db);

	/* ------------------------------------------------   
     * Middleware
     * ----------------------------------------------- */
	app.use(sessionHandler.isLoggedIn);


	/* ------------------------------------------------   
     * Login
     * ----------------------------------------------- */
	app.get('/', sessionHandler.displayLogin);
	app.post('/', sessionHandler.handleLogin);


	/* ------------------------------------------------   
     * Signup
     * ----------------------------------------------- */
	app.get('/signup', sessionHandler.displaySignup);
	app.post('/signup', sessionHandler.handleSignup);


	/* ------------------------------------------------   
     * Dashboard
     * ----------------------------------------------- */
	app.get('/dashboard', sessionHandler.displayDashboard);


	/* ------------------------------------------------   
     * REST API
     * ----------------------------------------------- */
	app.get('/project', apiHandler.getProjects);
	app.get('/project/:id', apiHandler.getProject);

	app.post('/project', apiHandler.handleNewProject);

    app.get('/project/:id/tasks', apiHandler.getTasks);
    app.post('/project/:id/tasks', apiHandler.handleNewTask);

    app.put('/project/:id/tasks/:tid', apiHandler.updateTask);
    app.delete('/project/:id/tasks/:tid', apiHandler.deleteTask);

    app.get('/tasks/:id/comments', apiHandler.getComments);
    app.post('/tasks/:id/comments', apiHandler.handleNewComment);
    app.delete('/tasks/:id/comments/:cid', apiHandler.deleteComment);

};