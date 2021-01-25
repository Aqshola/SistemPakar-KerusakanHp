const express = require("express");
const { getDiagnosa, getHasilDiagnosa } = require("../controller/diagnosa");

const router = express.Router();

router.get("/tanya/:id", getDiagnosa);
router.get("/hasil/:id", getHasilDiagnosa);

module.exports = router;
