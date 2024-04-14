const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/taskDao.js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },//rq
        description: { type: "string" },//nrq
        deadline: { type: "string", format: "date-time"},//rq
        usrId: { type: "string" },//Rq
        classId: { type: "string"},//nrq
    },
    required: ["name", "deadline", "usrId"],
    additionalProperties: false,
};

async function create(req, res) {
    try {
        let task = req.body;
        // validate input
        const valid = ajv.validate(schema, task);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        task.solved = false;
        res.json(taskDao.set(task));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { create };