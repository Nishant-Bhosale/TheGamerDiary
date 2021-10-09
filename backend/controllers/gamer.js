const asyncHandler = require('express-async-handler');
const Gamer = require('../models/Gamer');
const PC = require('../models/PC');
const moment = require('moment');

const addGamer = asyncHandler(async (req, res) => {
	const { name, money, amountOfTime, pcId, gamerId, selectedGame } = req.body;
	const gamer = await Gamer.findOne({ _id: gamerId });

	if (gamer && gamer.createdOn === moment().format('MM/DD/YYYY')) {
		//Conditional will execute if gamerId is sent
		gamer.endTime += amountOfTime * 60 * 1000;
		gamer.totalMoneyPaid += money;
		gamer.totalTime += amountOfTime;

		await gamer.save();
		res.status(201).json({ gamer });
	} else {
		//Conditional satement executes if Gamer ID is not sent
		const startTime = Date.now();
		const endTime = startTime + amountOfTime * 60 * 1000;

		if (startTime > endTime) {
			res.status(400);
			throw new Error('Invalid time');
		}
		const gamer = new Gamer({
			name,
			startTime,
			endTime,
			isPlaying: true,
			totalMoneyPaid: money,
			totalTime: amountOfTime,
			selectedGame: selectedGame,
			createdOn: moment().format('MM/DD/YYYY'),
		});

		const pc = await PC.findOne({ pcNumber: pcId });

		//Again, this can be handled on the frontend
		if (pc.isOccupied) {
			res.status(400);
			throw new Error('PC already occupied');
		}

		pc.isOccupied = true;
		pc.currentGamer = gamer._id;

		await pc.save();
		await gamer.save();
		res.status(201).json({ gamer });
	}
});

const getGamer = asyncHandler(async (req, res) => {
	const gamer = await Gamer.findById(req.params.id);

	if (!gamer) {
		res.status(400);
		throw new Error('Gamer not found');
	}

	res.status(200).json({ gamer });
});

const removeGamer = asyncHandler(async (req, res) => {
	const gamer = await Gamer.findById(req.params.id);

	gamer.isPlaying = false;

	const pc = await PC.findOne({ currentGamer: req.params.id });

	if (!pc) {
		res.status(400);
		throw new Error('PC not found');
	}

	pc.isOccupied = false;
	pc.currentGamer = null;

	await pc.save();
	await gamer.save();
	res.status(200).send();
});

const updateGamer = asyncHandler(async (req, res) => {
	const { amountOfTime, money } = req.body;

	const gamer = await Gamer.findById(req.params.id);

	if (!gamer) {
		res.status(400);
		throw new Error('Gamer not found');
	}

	gamer.totalMoneyPaid += money;
	const updatedTime = moment(gamer.endTime).add(amountOfTime, 'm').toDate();

	gamer.totalTime += amountOfTime;
	gamer.endTime = updatedTime;

	await gamer.save();

	res.status(200).json({ gamer });
});

const getGamersOfASpecificDate = asyncHandler(async (req, res) => {
	const { date } = req.body;

	const gamers = await Gamer.find({ createdOn: date });

	if (gamers.length === 0) {
		res.status(200).json({ message: `No gamers for found on ${date} ` });
		return;
	}

	res.status(200).json({ gamers });
});

module.exports = {
	getGamer,
	addGamer,
	removeGamer,
	updateGamer,
	getGamersOfASpecificDate,
};
