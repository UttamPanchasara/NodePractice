var express = require('express');
var router = express.Router();

//required controller modules
var record_controller = require('../controllers/recordsController');

/* GET records listing. */
router.get('/', record_controller.records_list);

/* GET record. */
router.get('/:id', record_controller.records_detail);

/* POST create record. */
router.post('/create', record_controller.records_create);

module.exports = router;