const express = require("express");
const { getRusak, getGejala, getRelasi } = require("../controller/admin");

const router = express.Router();

router.get("/", getRusak);
router.get("/gejala", getGejala);
router.get("/relasi", getRelasi);

module.exports = router;
