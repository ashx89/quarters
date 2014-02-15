var UserDAO     = require('../objects/users').UserDAO
  , ProjectsDAO = require('../objects/projects').ProjectsDAO
  , SessionDAO  = require('../objects/sessions').SessionDAO;


 function SessionHandler(db) {

    var users    = new UserDAO(db);
    var sessions = new SessionDAO(db);
    var projects = new ProjectsDAO(db);

    /* ------------------------------------------------   
     * Middleware
     * ----------------------------------------------- */
    this.isLoggedIn = function(req, res, next) {

        var sessionID = req.cookies.session;
        sessions.getUsername(sessionID, function(err, username) {

            if (!err && username) req.username = username;

            return next();
        });
    };

    /* ------------------------------------------------   
     * Login Requests
     * ----------------------------------------------- */
    this.displayLogin = function(req, res, next) {
        if (req.username) res.redirect('/dashboard');
        return res.render('index', { username: "", password: "", login_error: "", isErrors: false});
    };


    this.handleLogin = function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        console.log("User submitted username: " + username + " password: " + password);

        users.validateLogin(username, password, function(err, user) {

            if (err) {
                if (err.message) {
                    for (var i = 0; i < err.message.length; i++) {
                        return res.render('index', {username: "", passowrd: "", login_error: err.message[i], isErrors: true});
                    }
                }
                else return next(err);
            }

            sessions.sessionStart(user['_id'], function(err, sessionID) {
                if (err) return next(err);
                res.cookie('session', sessionID);
                return res.redirect('/dashboard');
            });
        });
    };

    /* ------------------------------------------------   
     * Logout Request
     * ----------------------------------------------- */
    this.displayLogout = function(req, res, next) {

        var sessionID = req.cookies.session;

        sessions.sessionEnd(sessionID, function(err) {
            res.cookie('session', '');
            return res.redirect('/');
        });
    };


    /* ------------------------------------------------   
     * Signup Requests
     * ----------------------------------------------- */
    this.displaySignup = function(req, res, next) {
        if (req.username) res.redirect('/dashboard');
        res.render('signup', {
            username: "",
            username_error: "",
            password: "",
            password_error: "",
            verify_error: "",
            isErrors: false
        });
    };


    function validateSignup(username, password, verify, errors) {

        var USER_REGX = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_REGX = /^.{6,20}$/;

        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error']   = "";

        if (!USER_REGX.test(username) || !username)
            errors['username_error'] = "Invalid username. Please use only letters and numbers";
            errors['isErrors'] = true;

        if (!PASS_REGX.test(password) || !password)
            errors['password_error'] = "Invalid password.";
            errors['isErrors'] = true;

        if (password != verify || !verify)
            errors['verify_error'] = "Passwords do not match.";
            errors['isErrors'] = true;


        if (errors['isError']) return false;

        return true;
    };


    this.handleSignup = function(req, res, next) {

        var username = req.body.username;
        var password = req.body.password;
        var verify   = req.body.password_confirm;

        // set up for an error case
        var errors = {'username': username};

        if (validateSignup(username, password, verify, errors)) {

            users.addUser(username, password, function(err, user) {

                if (err) {
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use.";
                        errors['isErrors'] = true;
                        return res.render('signup', errors);
                    }
                    else {
                        // some other error
                        return next(err);
                    }
                }

                sessions.sessionStart(user['_id'], function(err, sessionID) {
                    if (err) return next(err);
                    res.cookie('session', sessionID);
                    return res.redirect('/dashboard');
                });
            });
        }
        else {
            console.log("User did not validate");
            return res.render('signup', errors);
        }
    };


    /* ------------------------------------------------   
     * Dashboard Requests
     * ----------------------------------------------- */
    this.displayDashboard = function(req, res, next) {

        if (!req.username) {
            console.log("Can't Identify user... redirecting to login page");
            return res.redirect('/');
        }

        projects.getProjects(5, function(err, items) {
            if (err) throw err;

            return res.render('dashboard', {
                title: 'Dashboard',
                username: req.username,
                projects: items
            });
        });
        
    };

};

module.exports = SessionHandler;

