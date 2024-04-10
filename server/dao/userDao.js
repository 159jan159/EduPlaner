const fs = require("fs");
const path = require("path");

const usersFolderPath = path.join(__dirname, "storage", "Users");

//create
function set(user) {
    //TODO Generate user id, add to user object 
    //TODO - do i reallz need? check if uset id  allready exists return error orher way we would overwrite user 
    try {
        user.id = "3112";
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
        return "Success";
    } catch (error) {
        throw { code: "failedToRemoveUser", message: error.message };
    }
}
//update

//get
function get(userId) {
    try {
        const userlist = list();
        const user = userlist.find(
            (a) => a.userId === userId && a.eventId === eventId
        );
        return user;
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll

module.exports = {
    get,
    set,
    remove
};
