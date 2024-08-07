const mongoose = require("mongoose");

const ClicicSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	request: {
		type: String,
		required: false,
	},
});

const Clinic = mongoose.model("Clinic-list", ClicicSchema);

module.exports = Clinic;
