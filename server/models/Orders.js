const { default: mongoose } = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const ordersSchema = new Schema({
	customer: { type: Object, required: true },
	cartItems: { type: [Object] },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.models.ordersSchema || model('Orders', ordersSchema);
