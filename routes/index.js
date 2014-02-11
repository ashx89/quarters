var SessionHandler = require('./session')
  , APIHandler = require('./api');

module.exports = exports = function(app, db) {

	var sessionHandler = new SessionHandler(db);
	var apiHandler 	   = new APIHandler(db);

	// Middleware
	app.use(sessionHandler.isLoggedIn);

	// Login
	app.get('/', sessionHandler.displayLogin);
	app.post('/', sessionHandler.handleLogin);

	// Signup
	app.get('/signup', sessionHandler.displaySignup);
	app.post('/signup', sessionHandler.handleSignup);

	app.get('/dashboard', sessionHandler.displayDashboard);

	// API
	app.get('/api/projects', apiHandler.getProjects);

};