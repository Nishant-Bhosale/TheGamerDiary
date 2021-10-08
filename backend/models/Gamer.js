const mongoose = require("mongoose");

const { Schema } = mongoose;

const GamerSchema = new Schema(
	{
		name: {
			type: String,
		},
		startTime: {
			type: Number,
			required: true,
		},
		endTime: {
			type: Number,
			required: true,
		},
		totalMoneyPaid: {
			type: Number,
		},
		totalTime: {
			type: Number,
		},
		createdOn: {
			type: String,
		},
		isPlaying: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	},
);

const Gamer = mongoose.model("Gamer", GamerSchema);

module.exports = Gamer;
