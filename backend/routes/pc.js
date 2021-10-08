const express = require("express");
const router = express.Router();

const { getPC, addPC, getFreePCs, updatePC } = require("../controllers/pc");

router.route("/pc").get(getPC).post(addPC).put(updatePC);
router.route("/pc/all").get(getFreePCs);
module.exports = router;
