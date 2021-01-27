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
  getEditRelasi,
  postEditRelasi,
  postRemoveRelasi,
} = require("../controller/admin");
const Auth = require("../middleware/Auth");
const router = express.Router();

//Rusak Route
router.get("/", Auth, getRusak);
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

//Relasi Route
router.get("/relasi", getRelasi);
router.get("/add/relasi", getAddRelasi);
router.get("/edit/relasi/:id", getEditRelasi);
router.post("/add/relasi", postAddRelasi);
router.post("/edit/relasi/:id", postEditRelasi);
router.post("/remove/relasi/:id", postRemoveRelasi);

module.exports = router;
