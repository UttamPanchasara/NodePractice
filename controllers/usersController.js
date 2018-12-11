var db = require('../config/dbconfig.js');
var servedata = require('../helpers/servedata');


exports.emitUsers = function () {
	var sql = "SELECT * FROM users";
	db.query(sql, function (err, result, fields) {
		if (err) {
			io.emit('users', null);
		} else {
			io.emit('users', result);
		}
	});
}

// get users list
exports.users_list = function (req, res) {

	var sql = "SELECT * FROM users";
	db.query(sql, function (err, result, fields) {
		if (err) {
			servedata.sendError(200, err, res);
		} else {
			servedata.sendResult(res, result);
		}
	});
};

// get user
exports.users_detail = function (req, res) {

	var userId = req.params.id;
	var sql = "SELECT * FROM users WHERE id = '" + userId + "' LIMIT 1";
	db.query(sql, function (err, result, fields) {
		if (err) {
			servedata.sendError(200, err, res);
		} else {
			servedata.sendResult(res, result);
		}
	});
};

// create user
exports.users_create = function (req, res) {

	if (req.body) {
		var name = req.body.userName;
		var email = req.body.userEmail;
		var number = req.body.userNumber;

		if (name && number && email) {

			var sql = "SELECT COUNT(*) FROM users WHERE userEmail = '" + email + "'";
			db.query(sql, function (err, result, fields) {
				if (err) {
					servedata.sendError(200, err, res);
				} else {
					// if user found with entered email address sedn error.
					if (!result) {
						servedata.sendErrorWithMessage(200, "Email address already registered!" + result, res);
					} else {
						// insert user
						var sql = "INSERT INTO users(userName,userEmail,userNumber) VALUES('" + name + "', '" + email + "', '" + number + "')";
						db.query(sql, function (err, result, fields) {
							if (err) {
								servedata.sendError(200, err, res);
							} else {
								// get user and send in result
								db.query("SELECT * FROM users WHERE userEmail = '" + email + "' LIMIT 1", function (err, result, fields) {
									if (err) {
										servedata.sendError(200, err, res);
									} else {
										servedata.sendResult(res, result);
									}
								})
							}
						});
					}
				}
			})
		} else {
			// send error if we got empty data or body
			servedata.sendErrorWithMessage(400, 'data missing!', res);
		}
	} else {
		// send error if we got empty data or body
		servedata.sendErrorWithMessage(400, 'empty body', res);
	}
};