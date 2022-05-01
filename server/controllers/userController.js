const ApiError = require('../error/ApiError.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const generateJwt = (id, email, role) => {
	const sekret_Key = config.get('jwtSecret');
	return jwt.sign({ id, email, role }, sekret_Key, {
		expiresIn: '24h',
	});
};

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest('Не коректний email або password'));
		}
		const candidate = await User.findOne({ email });
		if (candidate) {
			return next(ApiError.badRequest('Користувач з таким email уже існує'));
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ email, role, password: hashPassword });
		// const basket = await Basket.create({userId: user.id})
		const token = generateJwt(user.id, user.email, user.role);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return next(ApiError.internal('Користувач не знайдений'));
		}
		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.internal('Вказаний невірний пароль'));
		}
		const token = generateJwt(user.id, user.email, user.role);
		return res.json({ token });
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({ token });
	}
}

module.exports = new UserController();
