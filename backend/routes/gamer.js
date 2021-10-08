const express = require("express");
const {
	addGamer,
	getGamer,
	updateGamer,
	removeGamer,
} = require("../controllers/gamer");
const router = express.Router();

router.route("/gamer").post(addGamer);
router.route("/gamer/:id").get(getGamer).put(updateGamer).delete(removeGamer);

module.exports = router;
