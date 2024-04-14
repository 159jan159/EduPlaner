const Ajv = require("ajv");
const ajv = new Ajv();

const semesterDao = require("../../dao/semesterDao.js");
const classDao = require("../../dao/classDao.js");
const taskDao = require("../../dao/taskDao.js");
const meetingDao = require("../../dao/meetingDao.js");
const e = require("express");

const schema = {
    type: "object",
    properties: {
        usrId: { type: "string" },
    },
    required: ["usrId"],
    additionalProperties: false,
};

async function dashboard(req, res) {
    try {
        let dshbrd = req.body;

        // validate input
        const valid = ajv.validate(schema, dshbrd);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }
        
        
        const semesterList = Object.values(semesterDao.list());
        const classsList = Object.values(classDao.list()).filter((c) => c.usrId === dshbrd.usrId && c.semesterId === semesterList[0].id);

        classesId = []
        classsList.forEach((c) => {
            classesId.push(c.id);
        });
        
        const taskList = Object.values(taskDao.list()).filter((t) => t.usrId === dshbrd.usrId);
        const meetingList = Object.values(meetingDao.list()).filter((m) => classesId.includes(m.classId));

        let dtoOut = {
            semester: semesterList,
            class: classsList,
            task: taskList,
            meeting: meetingList,
        };

        res.json(dtoOut);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { dashboard };