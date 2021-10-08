const mongoose = require("mongoose");

const { Schema } = mongoose;

const GamerSchema = new Schema(
	{
		name: {
			type: String,
		},
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
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
