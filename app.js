var express = require('express')
	, app = express()
	, Mongo = require('mongodb').MongoClient
	, routes = require('./routes')
	, path = require('path');
	// , mongoose = require('mongoose'); - maybe mongoose?

Mongo.connect('mongodb://localhost:27017/quarters', function(err, db) {

	if (err) throw err;

	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	// Middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());
    // Middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());
    // Static files found in public
    app.use(express.static(path.join(__dirname, 'public')));

    routes(app, db);

    app.listen(3000);
    console.log('Express erver listening on port 3000');

});