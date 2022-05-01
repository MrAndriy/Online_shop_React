const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
		if (!token) {
			return res.status(401).json({ message: 'Не авторизований' });
		}
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded;
		next();
	} catch (e) {
		res.status(401).json({ message: 'Не авторизований' });
	}
};
