const express = require("express");
const {
  getRusak,
  getGejala,
  getRelasi,
  getAddRusak,
  getAddGejala,
  getAddRelasi,
  postAddRusak,
  postAddGejala,
  postAddRelasi,
} = require("../controller/admin");

const router = express.Router();

router.get("/", getRusak);
router.get("/gejala", getGejala);
router.get("/relasi", getRelasi);

router.get("/add/rusak", getAddRusak);
router.post("/add/rusak", postAddRusak);

router.get("/add/gejala", getAddGejala);
router.post("/add/gejala", postAddGejala);

router.get("/add/relasi", getAddRelasi);
router.post("/add/relasi", postAddRelasi);

module.exports = router;
