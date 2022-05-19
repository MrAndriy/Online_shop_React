const Orders = require('../models/Orders');
const jwt = require('jsonwebtoken');
const config = require('config');
const ApiError = require('../error/ApiError');

class ordersController {
	async createOrder(req, res, next) {
		try {
			const { customer, cartItems } = req.body;
			let userId = 'Unauthorized';
			if (!!req.headers.authorization) {
				const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
				const decoded = jwt.verify(token, config.get('jwtSecret'));
				userId = decoded.id;
			}

			const newOrder = await Orders.create({
				customer: customer,
				cartItems: cartItems,
				owner: userId,
			});

			res.json(newOrder);
		} catch (e) {
			res.status(500).send({
				message: 'Some error occured while retrieving orders.',
			});
		}
	}

	async getAll(req, res) {
		try {
			const orders = await Orders.find({ owner: req.user.id });
			res.json(orders);
		} catch (e) {
			res.status(500).send({
				message: 'Some error occured while retrieving orders.',
			});
		}
	}

	async getAllAdminPage(req, res, next) {
		try {
			const orders = await Orders.find({});
			return res.json(orders);
		} catch (e) {
			res.status(500).send({
				message: 'Some error occured while retrieving orders.',
			});
		}
	}

	async getOne(req, res, next) {
		try {
			const order = await Orders.findById(req.params.id);
			if (order !== null) {
				res.json(order);
			} else {
				return next(ApiError.NotFound());
			}
		} catch (e) {
			res.status(500).send({
				message: 'Some error occured while retrieving order.',
			});
		}
	}
}

module.exports = new ordersController();
