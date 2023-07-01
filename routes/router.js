const express = require("express");

const login = require("../controller/login");
const register = require("../controller/register");
const dashboard = require("../controller/dashboard");
const authenticate = require("../controller/authenticate");
const editor = require("../controller/editor");


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", dashboard);
router.get("/authenticate", authenticate)
router.post("/editor", editor)

module.exports = router;
