const express = require("express");
const { getLogin, postLogin, logOut } = require("../controller/auth");

const router = express.Router();

router.get("/", getLogin);
router.post("/", postLogin);

router.get("/logout", logOut);

module.exports = router;
