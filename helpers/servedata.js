exports.success = function success(data) {
	return {
		success: true,
		message: 'success',
		data: data
	}
};

exports.sendError = function (errorCode, err, res) {
	res.status(errorCode).send({
		success: false,
		message: err.sqlMessage
	});
};

exports.sendErrorWithMessage = function (errorCode, errorMessage, res) {
	res.status(errorCode).send({
		success: false,
		message: errorMessage
	});
};

exports.sendResult = function (res, result) {
	res.status(200).send({
		success: true,
		message: 'success',
		data: result
	});
};

exports.error = function error(data) {
	return {
		success: false,
		message: 'error',
		data: data
	}
}