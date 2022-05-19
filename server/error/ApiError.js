class ApiError extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static badRequest(message = 'Bad Request') {
		return new ApiError(400, message);
	}

	static Unauthorized(message = 'Not Authorizated') {
		return new ApiError(401, message);
	}

	static NotFound(message = 'Not Found') {
		return new ApiError(404, message);
	}

	static forbidden(message = 'Forbidden') {
		return new ApiError(403, message);
	}
	static internal(message = 'Internal Server Error') {
		return new ApiError(500, message);
	}
}

module.exports = ApiError;
