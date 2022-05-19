const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	title: { type: String, required: true },
	image: { type: String, required: true },
	additionalImages: { type: String },
	views: { type: Number, default: 0 },
	description: { type: String, required: true },
	price: { type: Number, required: true, default: 0 },
});

productSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Product', productSchema);
