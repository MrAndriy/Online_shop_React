const { default: mongoose } = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	links: [{ type: Types.ObjectId, ref: 'Link' }],
	role: { type: String, default: 'USER' },
	created: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || model('User', userSchema);
