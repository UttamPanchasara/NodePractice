var express = require('express');
var dateformat = require('dateformat');
var app = express();
var db = require('../../db');
var servedata = require('../servedata');
var bodyParser = require('body-parser');
var apiversion = require('./apiversion');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var endPoint = apiversion.url();

//current date : timestamp
var currentTime = new Date();

// Basic usage
var date = dateformat(currentTime, "dd/mm/yyyy");

console.log(currentTime);

// get all records
app.get(endPoint + '/records', function (req, res) {

	var productId = req.query.productId;

	if (!productId) {
		var sql = "SELECT * FROM records";
		db.query(sql, function (err, result, fields) {
			if (err) throw err;

			res.status(200).send(
				servedata.success(result)
			);
		});
	} else {
		var sql = "SELECT * FROM records WHERE productId = '" + productId + "' LIMIT 1";
		db.query(sql, function (err, result, fields) {
			if (err) throw err;
			res.status(200).send(
				servedata.success(result)
			);
		});
	}
});

// add record
app.post(endPoint + '/records', function (req, res) {

	console.log(req.body.productId);

	if (req.body) {
		var productId = req.body.productId;
		var customerName = req.body.customerName;
        var customerNumber = req.body.customerNumber;
        var customerAddress = req.body.customerAddress;

		if (productId && customerName) {
			var sql = "INSERT INTO records(productId,customerName,customerNumber,customerAddress,createdDate) VALUES('" + productId + "', '" + customerName + "', '" + customerNumber + "', '" + customerAddress + "', '" + date + "')";
			db.query(sql, function (err, result, fields) {
				if (err) throw err;

				db.query("SELECT * FROM records WHERE productId = '" + productId + "' LIMIT 1", function (err, result, fields) {
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
	} else {
		return res.status(400).send(
			servedata.error('empty body')
		);
	}
});

app.listen(8080);