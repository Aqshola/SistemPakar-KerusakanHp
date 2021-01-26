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
  getEditGejala,
  postEditGejala,
  postRemoveGejala,
} = require("../controller/admin");

const router = express.Router();

//Rusak Route
router.get("/", getRusak);
router.get("/add/rusak", getAddRusak);
router.get("/edit/rusak/:id", getEditRusak);
router.post("/add/rusak", postAddRusak);
router.post("/edit/rusak/:id", postEditRusak);
router.post("/remove/rusak/:id", postRemoveRusak);

//Gejala Route
router.get("/gejala", getGejala);
router.get("/add/gejala", getAddGejala);
router.get("/edit/gejala/:id", getEditGejala);
router.post("/add/gejala", postAddGejala);
router.post("/edit/gejala/:id", postEditGejala);
router.post("/remove/gejala/:id", postRemoveGejala);

router.get("/relasi", getRelasi);
router.get("/add/relasi", getAddRelasi);
router.post("/add/relasi", postAddRelasi);

module.exports = router;
