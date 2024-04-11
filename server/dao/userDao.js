const fs = require("fs");
const path = require("path");
const {uid: uid} = require("uid");

const usersFolderPath = path.join(__dirname, "storage", "Users");

//create
function set(user) {
    //TODO - do i reallz need? check if uset id  allready exists return error orher way we would overwrite user 
    try {
        user.id = uid(16);
        const filePath = path.join(usersFolderPath, `${user.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(user), "utf8");
        return user;
    } catch (error) {
        throw { code: "failedToCreateUser", message: error.message };
    }
}
//remove
function remove(userId) {
    try {
        const filePath = path.join(usersFolderPath, `${userId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        throw { code: "failedToRemoveUser", message: error.message };
    }
}
//update
function update(user) {
    try {
        const filePath = path.join(usersFolderPath, `${user.id}.json`);
        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, JSON.stringify(user), "utf8");
    } catch (error) {
        throw { code: "failedToUpdateUser", message: error.message };
    }
}
//get
function get(userUniqueIdentifier) {
    try {
        const userlist = list();
        for (const [key, value] of Object.entries(userlist)) {
            if (value.id === userUniqueIdentifier||value.email === userUniqueIdentifier) {
                return value;
            }
        }
        return { code: "failedToFindUser", message: error.message }
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll
function list() {
    try {
        let usersMap = {};
        const filesList = fs.readdirSync(usersFolderPath);
        filesList.forEach(element => {
            data = fs.readFileSync(path.join(usersFolderPath, element));
            const ndata = JSON.parse(data);
            usersMap[ndata.email] = ndata;
        });
        return usersMap;
    } catch (error) {
        throw { code: "failedToReadUser", message: error.message };
    }
}

module.exports = {
    get,
    set,
    update,
    remove,
    list
}