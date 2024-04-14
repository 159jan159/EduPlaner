const express = require("express");
const router = express.Router();

const loginAbl = require("../abl/user/loginAbl.js")
const registerAbl = require("../abl/user/registerAbl.js")



router.get("/login", (req, res) => {
    loginAbl.login(req,res);
});

router.post("/register", (req, res) => {
    registerAbl.register(req,res);
});

router.get("/update", (req, res) => {
    updateAbl.update(req,res);
});



module.exports = router;