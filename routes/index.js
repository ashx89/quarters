var SessionHandler = require('./session')
  , ContentHandler = require('./content');

module.exports = exports = function(app, db) {

	var sessionHandler = new SessionHandler(db);
	var contentHandler = new ContentHandler(db);

	// Middleware
	app.use(sessionHandler.isLoggedIn);


	// Login
	app.get('/', sessionHandler.displayLogin);
	app.post('/', sessionHandler.handleLogin);

	// Signup
	app.get('/signup', sessionHandler.displaySignup);
	app.post('/signup', sessionHandler.handleSignup);

	app.get('/dashboard', sessionHandler.displayDashboard);

};