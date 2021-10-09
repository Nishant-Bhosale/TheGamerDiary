const express = require("express");
const router = express.Router();

const { getPC, getFreePCs } = require("../controllers/fetchDevicesHandler");

router.route("/api/getPcs").get(getPC);
router.route("/api/getFree").get(getFreePCs);
module.exports = router;
