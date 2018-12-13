exports.sendMsg = function (req, res) {
    io.emit('connection_msg', 'alive');
    res.send('alive');
}