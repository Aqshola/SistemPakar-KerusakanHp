const express = require("express");
const { getMain, postMain } = require("../controller/main");

const router = express.Router();

router.get("/", getMain);

module.exports = router;
