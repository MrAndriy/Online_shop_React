const Orders = require('../models/Orders');

class ordersController {
	async createOrder(req, res) {
		const { customer, cartItems } = req.body;

		const newOrder = await Orders.create({
			customer: customer,
			cartItems: cartItems,
		})
			.then((responce) => res.send(responce))
			.catch((e) => {
				res.status(500).send({
					message: 'Some error occured while retrieving cart.',
				});
			});
	}

	async getAll(req, res) {
		Orders.find()
			.then((data) => res.send(data))
			.catch((e) => {
				res.status(500).send({
					message: 'Some error occured while retrieving cart.',
				});
			});
	}
}

module.exports = new ordersController();
