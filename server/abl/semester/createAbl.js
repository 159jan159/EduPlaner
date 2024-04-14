const Ajv = require("ajv");
const ajv = new Ajv();

const semesterDao = require("../../dao/semesterDao.js");
const e = require("express");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};

async function create(req, res) {
    try {
        let semester = req.body;

        // validate input
        const valid = ajv.validate(schema, semester);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const createdSemester = semesterDao.set(semester);
        res.json(createdSemester);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { create };