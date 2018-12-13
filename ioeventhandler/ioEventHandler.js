//required controller modules
var user_controller = require('../controllers/usersController');

exports.loadUsers = function (data) {
    console.log('event : load_users ' + data);
    user_controller.emitUsers();
}