const adminProfileModel = require("../models/adminProfileModel");

const authorisationHandler = async (req, res) => {
	try {
		const data = await adminProfileModel.findOne({ _id: req._id });
		res.status(200).json({ authorisation: true });
	} catch (err) {
		res.status(500).send();
	}
};

module.exports = authorisationHandler;
