const Ajv = require("ajv");
const ajv = new Ajv();

const semesterDao = require("../../dao/classDao.js");
const e = require("express");

const schema = {
    type: "object",
    properties: {
        usrId: { type: "string" },
        semesterId: { type: "string" },
    },
    required: ["usrId", "semesterId"],
    additionalProperties: false,
};

async function listAll(req, res) {
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

        const classsList = semesterDao.list();
        filteredClassList = Object.values(classsList).filter((c) => c.usrId === classs.usrId && c.semesterId === classs.semesterId);
        res.json(filteredClassList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { listAll };