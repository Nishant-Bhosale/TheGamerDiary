const asyncHandler = require("express-async-handler");
const PC = require("../models/PC");

const getPC = asyncHandler(async (req, res) => {
	const PCs = await PC.find()
		.populate("currentGamer", ["endTime", "name", "startTime"])
		.exec();

	res.status(200).json({ data: PCs });
});

const getFreePCs = asyncHandler(async (req, res) => {
	const PCs = await PC.find({ isOccupied: false });

	res.status(200).json({ PCs });
});

module.exports = { getPC, getFreePCs };
