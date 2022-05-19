const { default: mongoose } = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
	fullname: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	orders: [{ type: Types.ObjectId, ref: 'Orders' }], // ref to ordersSchema
	role: { type: String, default: 'USER' },
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || model('User', userSchema);
