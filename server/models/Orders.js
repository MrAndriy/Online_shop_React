const { default: mongoose } = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const ordersSchema = new Schema({
	customer: { type: Object },
	cartItems: { type: [Object] },
	date: { type: Date, default: Date.now },
	owner: { type: Types.ObjectId, ref: 'User' }, // ref to UserSchema
});

module.exports = mongoose.models.ordersSchema || model('Orders', ordersSchema);
