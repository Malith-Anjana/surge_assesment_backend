const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	userId:{type:String, required:true},
	title: { type: String, required: true },
	description: { type: String, required:true},
});

const Note = mongoose.model("notes", noteSchema);

module.exports = { Note};