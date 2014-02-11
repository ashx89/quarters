var bcrypt = require('bcrypt-nodejs');

function UserDAO(db) {

	var users = db.collection('users');

	this.addUser = function(username, password, callback) {

		var salt = bcrypt.genSaltSync();
		var password_hash = bcrypt.hashSync(password, salt);

		var user = {'_id': username, 'password': password_hash};

		users.insert(user, function(err, doc) {

			if (err) return callback(err, null);

			return callback(null, doc[0]);

		});
	};


	this.validateLogin = function(username, password, callback) {

		function validateDoc(err, user) {

			if (err) return callback(err, null);

			// Set up error object
			var error = {};
			error.message = [];

			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					callback(null, user);
				}
				else {
					err.message.push(new Error("Invalid Password"));
					err.password_error = true;
					callback(error, null);
				}
			}
			else {
				err.message.push(new Error("User: " + user + " does not exists"));			
				err.no_user_error = true;
				callback(error, null);
			}

		};

		users.findOne({'_id': username}, validateDoc);

	};

};


module.exports.UserDAO = UserDAO;
