var db = require('../config/dbconfig.js');
var servedata = require('../helpers/servedata');
var dateformat = require('dateformat');

//current date : timestamp
var currentTime = new Date();

// Basic usage
var date = dateformat(currentTime, "dd/mm/yyyy");

// get records list
exports.records_list = function (req, res) {

    var sql = "SELECT * FROM records";
    db.query(sql, function (err, result, fields) {
        if (err) {
            servedata.sendError(200, err, res);
        } else {
            servedata.sendResult(res, result);
        }
    });
};

// get record
exports.records_detail = function (req, res) {

    var productId = req.params.id;
    var sql = "SELECT * FROM records WHERE productId = '" + productId + "' LIMIT 1";
    db.query(sql, function (err, result, fields) {
        if (err) {
            servedata.sendError(200, err, res);
        } else {
            servedata.sendResult(res, result);
        }
    });
};

// create/add record
exports.records_create = function (req, res) {
    if (req.body) {
        var productId = req.body.productId;
        var customerName = req.body.customerName;
        var customerNumber = req.body.customerNumber;
        var customerAddress = req.body.customerAddress;

        if (productId && customerName) {
            // insert record
            var sql = "INSERT INTO records(productId,customerName,customerNumber,customerAddress,createdDate) VALUES('" + productId + "', '" + customerName + "', '" + customerNumber + "', '" + customerAddress + "', '" + date + "')";
            db.query(sql, function (err, result, fields) {
                if (err) {
                    servedata.sendError(200, err, res);
                } else {
                    // get record and send in result
                    db.query("SELECT * FROM records WHERE productId = '" + productId + "' LIMIT 1", function (err, result, fields) {
                        if (err) {
                            servedata.sendError(200, err, res);
                        } else {
                            servedata.sendResult(res, result);
                        }
                    })
                }
            });
        } else {
            // send error if we got empty data or body
            servedata.sendErrorWithMessage(400, 'data missing!', res);
        }
    } else {
        // send error if we got empty data or body
        servedata.sendErrorWithMessage(400, 'empty body', res);
    }
};