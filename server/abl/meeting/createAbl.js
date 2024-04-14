const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const meetingDao = require("../../dao/meetingDao.js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },//rq
        description: { type: "string" },//nrq
        startTime: { type: "string", format: "date-time"},//rq
        endTime: { type: "string", format: "date-time"},//Rq
        classId: { type: "string"},//rq
    },
    required: ["name", "startTime", "endTime","classId"],
    additionalProperties: false,
};

async function create(req, res) {
    try {
        let meeting = req.body;
        // validate input
        const valid = ajv.validate(schema, meeting);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        res.json(meetingDao.set(meeting));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { create };