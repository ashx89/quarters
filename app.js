var express     = require('express')
    , app       = express()
    , Mongo     = require('mongodb').MongoClient
    , routes    = require('./routes')
    , path      = require('path');

Mongo.connect('mongodb://localhost:27017/quarters', function(err, db) {

    if (err) throw err;

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));

    /* ------------------------------------------------   
     * Routes
     * ----------------------------------------------- */
    routes(app, db);

    app.listen(3000);
    console.log('Express erver listening on port 3000');

});
