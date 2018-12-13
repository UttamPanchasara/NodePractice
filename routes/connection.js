var express = require('express');
var router = express.Router();

//required controller modules
var connection_controller = require('../controllers/connectionController');

router.get('/', connection_controller.sendMsg);

module.exports = router;