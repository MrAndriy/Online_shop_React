const uuid = require('uuid');
const path = require('path');
const Product = require('../models/Product');

class ProductController {
	async create(req, res, next) {
		try {
			const { title, additionalImages, description, price } = req.body;
			const { image } = req.files;
			let fileName = uuid.v4() + '.jpg';
			image.mv(path.resolve(__dirname, '..', 'static', fileName));

			const product = await Product.create({
				title,
				image: fileName,
				additionalImages,
				description,
				price,
			});

			return res.json(product);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error });
		}
	}

	async getAll(req, res) {
		const { title } = req.query;
		const condition = title
			? { title: { $regex: new RegExp(title), $options: 'i' } }
			: {};
		Product.find(condition)
			.then((data) => res.send(data))
			.catch((e) => {
				res.status(500).send({
					message:
						err.message || 'Some error occured while retrieving products.',
				});
			});
	}

	async getOne(req, res) {
		const { id } = req.params;
		Product.findById(id)
			.then((data) => {
				if (!data)
					res.status(404).send({ message: 'Not found Product with id ' + id });
				else res.send(data);
			})
			.catch((err) => {
				res
					.status(500)
					.send({ message: 'Error retrieving Product with id=' + id });
			});
	}

	async updateOne(req, res) {
		const { id } = req.params;
		Product.findByIdAndUpdate(id, req.body, {
			useFindAndModify: false,
		})
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
					});
				} else res.send({ message: 'Product was updated successfully.' });
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Error updating Product with id=' + id,
				});
			});
	}

	async deleteOne(req, res) {
		const { id } = req.params;
		Product.findByIdAndRemove(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
					});
				} else {
					res.send({
						message: 'Product was deleted successfully!',
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Could not delete Product with id=' + id,
				});
			});
	}

	async deleteAll(req, res) {
		Product.deleteMany({})
			.then((data) => {
				res.send({
					message: `${data.deletedCount} Products were deleted successfuly`,
				});
			})
			.catch((e) => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while removing all tutorials.',
				});
			});
	}
}

module.exports = new ProductController();
