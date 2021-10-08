const express = require("express");
const { addGamer, getGamer } = require("../controllers/gamer");
const router = express.Router();

router.route("/gamer").post(addGamer);
router.route("/gamer/:id").get(getGamer);

module.exports = router;
