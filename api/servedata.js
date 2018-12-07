exports.success = function success(data){
	return {
				success: true,
				message: 'success',
				data: data
	}
};

exports.error = function error(data){
	return {
				success: false,
				message: 'error',
				data: data
	}
};