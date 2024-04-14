const express = require("express");
const router = express.Router();

const createAbl = require("../abl/task/createAbl.js");

router.post("/create", async (req, res) => {
    createAbl.create(req, res);
});

module.exports = router;