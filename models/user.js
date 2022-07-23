const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	email: { type: String, required: true },
	dateOfBirth: { type: Date, required: false },
	mobile:{type: Number, required: false },
	status:{type:Boolean, default:false},
	password: { type: String, required: true },
	accountType: { type: String, required: false },
});

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

const User = mongoose.model("user", userSchema);

module.exports = { User};