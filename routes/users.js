var express = require('express');
var router = express.Router();

//required controller modules
var user_controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/', user_controller.users_list);

/* GET user. */
router.get('/:id', user_controller.users_detail);

/* POST create user. */
router.post('/create', user_controller.users_create);

module.exports = router;