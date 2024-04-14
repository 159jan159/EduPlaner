const express = require("express");
const router = express.Router();

const meetingAbl = require("../abl/meeting/createAbl.js");

router.post("/create", async (req, res) => {
    meetingAbl.create(req, res);
});

module.exports = router;