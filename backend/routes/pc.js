const express = require("express");
const router = express.Router();

const { getPC, addPC, getFreePCs } = require("../controllers/pc");

router.route("/pc").get(getPC).post(addPC);
router.route("/pc/all").get(getFreePCs);
module.exports = router;
