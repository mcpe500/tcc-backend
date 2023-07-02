const express = require("express");

const login = require("../controller/login");
const register = require("../controller/register");
const dashboard = require("../controller/dashboard");
const authenticate = require("../controller/authenticate");
const code = require("../controller/code");


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", dashboard);
router.get("/authenticate", authenticate)
router.post("/code", code)

module.exports = router;
