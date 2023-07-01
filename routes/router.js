const express = require("express");

const login = require("../controller/login");
const register = require("../controller/register");
const dashboard = require("../controller/dashboard")


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", dashboard);

module.exports = router;
