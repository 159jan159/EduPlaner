const Ajv = require("ajv");
const ajv = new Ajv();
const sha256 = require("crypto-js/sha256.js");

const userDao = require("../../dao/userDao.js");

const schema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

async function login(req, res) {
    try {
        let user = req.body;

        // validate input
        const valid = ajv.validate(schema, user);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        const userList = userDao.list();
        const userExists = !!userList[user.email];
        if (!userExists) {
            res.status(400).json({
                code: "userNotFound",
                message: "User not found",
            });
            return;
        }
        userList[user.email].password === sha256(user.password).toString() ? res.json(userList[user.email]) : res.status(400).json({code: "wrongPassword", message: "Wrong password"});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { login };