const express = require("express");

const login = require("../controller/login");
const register = require("../controller/register");
const dashboard = require("../controller/dashboard");
const authenticate = require("../middleware/authenticate");
const code = require("../controller/code");
const authentication = require("../controller/authentication");
const admin = require('../controller/admin');

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", authenticate, dashboard);
router.post("/code", authenticate, code);
router.get("/authentication", authentication);

router.get('/admin-users')

module.exports = router;
