const jwt = require('jsonwebtoken');
const config = require('config');
const ApiError = require('../error/ApiError');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
		if (!token) {
			return next(ApiError.Unauthorized());
		}
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded;
		next();
	} catch (e) {
		return next(ApiError.Unauthorized());
	}
};
