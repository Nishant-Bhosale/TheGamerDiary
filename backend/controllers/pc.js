const asyncHandler = require("express-async-handler");
const PC = require("../models/PC");

const addPC = asyncHandler(async (req, res) => {
	const { pcNumber } = req.body;

	const pc = await PC.findOne({ pcNumber });

	if (pc) {
		res.status(400);
		throw new Error("PC already in place");
	}

	const newPC = new PC({
		pcNumber,
	});

	await newPC.save();
	res.status(201).json({ newPC });
});

const getPC = asyncHandler(async (req, res) => {
	const PCs = await PC.find()
		.populate("currentGamer", ["endTime", "name", "startTime"])
		.exec();

	res.status(200).json({ pcs: PCs });
});

const updatePC = asyncHandler(async (req, res) => {
	const pc = await PC.findOne({ pcNumber: req.body.number });

	pc.isOccupied = false;
	pc.currentGamer = null;

	await pc.save();

	res.status(200).json({ pc });
});

const getFreePCs = asyncHandler(async (req, res) => {
	const PCs = await PC.find({ isOccupied: false });

	res.status(200).json({ PCs });
});

module.exports = { addPC, getPC, getFreePCs, updatePC };
