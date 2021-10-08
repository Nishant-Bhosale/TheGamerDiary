const express = require("express");
const router = express.Router();

const getPC = require("../controllers/pc");

router.route("/api/getPcs").get(getPC)
module.exports = router;
