const Ajv = require("ajv");
const ajv = new Ajv();
const sha256 = require("crypto-js/sha256.js");

const userDao = require("../../dao/userDao.js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        surname: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
    },
    required: ["name","surname","email", "password"],
    additionalProperties: false,
};

async function register(req, res) {
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
            //todo create
            newUserObj = userDao.set({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: sha256(user.password).toString(),
                role: "0"
            });
            //todo return new user
            res.json(newUserObj)
            return;
        }else{
            res.status(400).json({
                code: "userAlreadyExists",
                message: "User already exists",
            });
            return;
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = { register };