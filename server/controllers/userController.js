const ApiError = require('../error/ApiError.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const generateJwt = (id, email, role, fullname) => {
	const sekret_Key = config.get('jwtSecret');
	return jwt.sign({ id, email, role, fullname }, sekret_Key, {
		expiresIn: '3h',
	});
};

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Not correct values while registration',
				});
			}
			const { email, password, role, fullname } = req.body;
			const candidateEmail = await User.findOne({
				email: email,
			});
			const candidateFullName = await User.findOne({ fullname: fullname });
			if (candidateEmail || candidateFullName) {
				return next(
					ApiError.badRequest(
						`${candidateEmail ? 'Email' : 'Full Name'} is allready used`
					)
				);
			}
			const hashPassword = await bcrypt.hash(password, 12);
			const user = await User.create({
				email,
				password: hashPassword,
				fullname,
			});
			const token = generateJwt(user.id, user.email, user.role, user.fullname);
			return res.json({ token });
		} catch (e) {
			console.log(e);
			return res.status(500).json(ApiError.internal());
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Not correct values while logging in',
				});
			}

			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return next(ApiError.NotFound('User not found'));
			}
			let comparePassword = bcrypt.compareSync(password, user.password);
			if (!comparePassword) {
				return next(ApiError.badRequest('Not correct password'));
			}
			const token = generateJwt(user.id, user.email, user.role, user.fullname);
			return res.json({ token });
		} catch (e) {
			console.log(e);
		}
	}

	async check(req, res, next) {
		const token = generateJwt(
			req.user.id,
			req.user.email,
			req.user.role,
			req.user.fullname
		);
		return res.json({ token });
	}
}

module.exports = new UserController();
