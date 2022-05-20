const Router = require('express');
const router = Router();
//controller
const userController = require('../controllers/userController');
//middleware
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post(
	'/registration',
	[
		check('email', 'Not correct email').isEmail(),
		check('password', 'Length of password must be min 6 and max 32').isLength({
			min: 6,
			max: 32,
		}),
		check('fullname', 'Enter your Full Name').exists(),
	],
	userController.registration
);

router.post(
	'/login',
	[
		check('email', 'Enter correct email').normalizeEmail().isEmail(),
		check('password', 'Length of password must be min 6 and max 32').isLength({
			min: 6,
			max: 32,
		}),
	],
	userController.login
);

router.get('/auth', authMiddleware, userController.check);

router.get('/find/:id', authMiddleware, checkRole('ADMIN'), userController.find);

module.exports = router;
