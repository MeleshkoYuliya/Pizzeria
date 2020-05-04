const mongoose = require('mongoose');
const { genPasswordHash } = require('../utils/password');

const { handleMongooseError } = require('../utils/mongooseError');

const Schema = mongoose.Schema;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: [true, 'Email - обязательное поле'],
		match: [emailRegex, 'Неверный формат email']
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Password - обязательное поле'],
		minlength: [6, 'Пароль должен быть больше 6 символов']
	},
});

UserSchema.pre('save', function (next) {
	if (this.password && this.isModified('password')) {
		this.password = genPasswordHash(this.password);
	}

	next();
});

UserSchema.post('save', handleMongooseError);

module.exports = mongoose.model('User', UserSchema);
