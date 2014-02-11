var crypto = require('crypto');

function SessionDAO(db) {

	var sessions = db.collection('sessions');

	this.sessionStart = function(username, callback) {

		// Generate session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var sessionID = crypto.createHash('sha1').update(current_date + random).digest('hex');

		var session = {'username': username, '_id': sessionID};

		sessions.insert(session, function(err, session) {
			if (err) throw err;
			callback(err, session);
		});

	};

	this.sessionEnd = function(sessionID, callback) {
		session.remove({'_id': sessionID}, function(err, numRemoved) {
			callback(err);
		});
	};

	this.getUsername = function(sessionID, callback) {

		if (!sessionID) {
			callback(Error("Session not set"), null);
			return;
		}

		sessions.findOne({'_id': sessionID[0]._id}, function(err, session) {

			if (err) return callback(err, null);

			if (!session) return callback(new Error("Session: " + session + " does not exist"), null);

			callback(null, session.username);

		});

	};

};

module.exports.SessionDAO = SessionDAO;
