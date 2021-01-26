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
  getEditRusak,
  postEditRusak,
  postRemoveRusak,
} = require("../controller/admin");

const router = express.Router();

//Rusak Route
router.get("/", getRusak);
router.get("/add/rusak", getAddRusak);
router.get("/edit/rusak/:id", getEditRusak);
router.post("/add/rusak", postAddRusak);
router.post("/edit/rusak/:id", postEditRusak);
router.post("/remove/rusak/:id", postRemoveRusak);

router.get("/gejala", getGejala);
router.get("/relasi", getRelasi);

router.get("/add/gejala", getAddGejala);
router.post("/add/gejala", postAddGejala);

router.get("/add/relasi", getAddRelasi);
router.post("/add/relasi", postAddRelasi);

module.exports = router;
