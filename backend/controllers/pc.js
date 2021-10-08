const asyncHandler = require("express-async-handler");
const PC = require("../models/PC");


const getPC = asyncHandler(async (req, res) => {
	const PCs = await PC.find()
		.populate("currentGamer", ["endTime", "name", "startTime"])
		.exec();

	res.status(200).json({ data: PCs });
});

module.exports = getPC;
