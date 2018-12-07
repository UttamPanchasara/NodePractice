var express = require('express')
var app = express();
var db = require('F://Node/sample/db');
var servedata = require('F://Node/sample/api/servedata');
var bodyParser = require('body-parser');
var apiversion = require('./apiversion');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var endPoint = apiversion.url();

// get all users
app.get(endPoint +'/users', function(req, res) {
		
	var userId = req.query.id;

	if(!userId){
		var sql = "SELECT * FROM users";
		db.query(sql,function(err, result, fields){
			if (err) throw err;
			
			res.status(200).send(
				servedata.success(result)
			);
		});
	}else {
		var sql = "SELECT * FROM users WHERE id = '" + userId +"' LIMIT 1";
		db.query(sql,function(err, result, fields){
			if (err) throw err;
			res.status(200).send(
				servedata.success(result)
			);
		});
	}
});

app.post(endPoint +'/users', function(req, res) {
	
	console.log(req.body.name);
	
	if(req.body){		
		var name = req.body.name;
		var email = req.body.email;
		var number = req.body.number;

		if(name && number && email) {
			var sql = "INSERT INTO users(u_name,u_email,u_number) VALUES('" + name + "', '" + email + "', '" + number + "')";
			db.query(sql,function(err, result, fields){
				if (err) throw err;
				
				db.query("SELECT * FROM users WHERE u_email = '" + email + "' LIMIT 1", function(err,result,fields){
					res.status(200).send(
						servedata.success(result)
					);
				})
			});
		} else {
			return res.status(400).send(
				servedata.error('data missing!')
			);
		}
	}else{
		return res.status(400).send(
				servedata.error('empty body')
		);
	}
});

app.listen(8080);