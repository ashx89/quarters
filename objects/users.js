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

			if (user){
				if (bcrypt.compareSync(password, user.password)) {
					callback(null, user);
				}
				else {
					var invalid_password_error = new Error("Invalid Password");
					invalid_password_error.invalid_password = true;
					callback(invalid_password_error, null);
				}
			}
			else {
				var no_such_user_error = new Error("User: " + user + " does not exists");			
				no_such_user_error.no_such_user = true;
				callback(no_such_user_error, null);
			}
		};

		users.findOne({'_id': username}, validateDoc);

	};

};


module.exports.UserDAO = UserDAO;
