const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const classDao = require("../../dao/classDao.js");
const e = require("express");
const { format } = require("crypto-js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },//rq
        description: { type: "string" },//nrq
        deadline: { type: "date", format: "date-time"},//rq
        usrId: { type: "string" },//Rq
        classId: { type: "string"},//nrq
    },
    required: ["name", "deadline", "usrId"],
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

        classs.solved = false;
        const createdClass = classDao.set(classs);
        res.json(createdClass);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { create };