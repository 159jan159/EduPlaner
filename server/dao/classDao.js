const fs = require("fs");
const path = require("path");
const {uid: uid} = require("uid");

const classFolderParh = path.join(__dirname, "storage", "Classes");

//only admin

//create
function set(classs) {
    try {
        classs.id = uid(16);
        const filePath = path.join(classFolderParh, `${classs.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(classs), "utf8");
        return classs;
    } catch (error) {
        throw { code: "failedToCreateClass", message: error.message };
    }
}
//remove
function remove(classId) {
    try {
        const filePath = path.join(classFolderParh, `${classId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        throw { code: "failedToRemoveClass", message: error.message };
    }
}
//update
function update(classs) {
    try {
        const filePath = path.join(classFolderParh, `${classs.id}.json`);
        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, JSON.stringify(classs), "utf8");
    } catch (error) {
        throw { code: "failedToUpdateClass", message: error.message };
    }
}
//get
function get(classId) {
    try {
        const classList = list();
        for (const [key, value] of Object.entries(classList)) {
            if (value.id === classId) {
                return value;
            }
        }
        return { code: "failedToFindClass", message: error.message }
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll
function list() {
    try {
        let classMap = {};
        const filesList = fs.readdirSync(classFolderParh);
        filesList.forEach(element => {
            data = fs.readFileSync(path.join(classFolderParh, element));
            const ndata = JSON.parse(data);
            classMap[ndata.id] = ndata;
        });
        return classMap;
    } catch (error) {
        throw { code: "failedToReadClass", message: error.message };
    }
}

module.exports = {
    get,
    set,
    update,
    remove,
    list
}