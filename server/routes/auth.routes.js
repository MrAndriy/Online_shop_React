const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = Router();

// /api/auth/registation
router.post(
	'/registation',
	[
		check('email', 'not corect email').isEmail(),
		check('password', 'min length 6 ').isLength({ min: 6, max: 32 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'не коректні дані при регістарації',
				});
			}
			const { email, password } = req.body;

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({ message: 'email allready used' });
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({ email, password: hashedPassword });

			await user.save();

			res.status(201).json({ message: 'user created' });
		} catch (error) {
			res.status(500).json({ message: 'Щось пішло не так, пробуй ще' });
		}
	}
);

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'enter not empty email').normalizeEmail().isEmail(),
		check('password', 'enter password').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'не коректні дані при вході в систему',
				});
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				res.status(400).json({ message: 'користувача не знайдено' });
			}

			const isMatch = bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'невірний пароль' });
			}

			const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
				expiresIn: '1h',
			});

			res.json({ token, userId: user.id });
		} catch (error) {
			res.status(500).json({ message: 'Щось пішло не так, пробуй ще' });
		}
	}
);

router.get('/', (req, res) => {
	res.json({ message: 'working' });
});

module.exports = router;
