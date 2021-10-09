const mongoose = require("mongoose");
const { Schema } = mongoose;

const PCSchema = new Schema({
	isOccupied: {
		type: Boolean,
		default: false,
	},
	pcNumber: {
		type: Number,
		unique: true,
	},
	currentGamer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Gamer",
		default: null,
	},
});

const PC = mongoose.model("PC", PCSchema);

module.exports = PC;
