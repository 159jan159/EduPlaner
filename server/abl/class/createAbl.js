const Ajv = require("ajv");
const ajv = new Ajv();

const classDao = require("../../dao/classDao.js");
const e = require("express");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        usrId: { type: "string" },
        semesterId: { type: "string" },
    },
    required: ["name", "usrId", "semesterId"],
    additionalProperties: false,
};

async function create(req, res) {
    try {
        let classs = req.body;

        // validate input
        const valid = ajv.validate(schema, classs);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const createdClass = classDao.set(classs);
        res.json(createdClass);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { create };