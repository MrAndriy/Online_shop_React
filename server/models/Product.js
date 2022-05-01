const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	title: { type: String, required: true },
	image: { type: String, required: true },
	additionalImages: { type: String },
	description: { type: String, required: true },
	price: { type: Number, required: true, default: 0 },
});

module.exports = model('Product', productSchema);
