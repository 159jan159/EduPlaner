const express = require("express");
const router = express.Router();

const createAbl = require("../abl/class/createAbl.js");
const listAll = require("../abl/class/listAllAbl.js");

router.post("/create", async (req, res) => {
    createAbl.create(req, res);
});

router.get("/listAll", async (req, res) => {
    listAll.listAll(req, res);
});

module.exports = router;