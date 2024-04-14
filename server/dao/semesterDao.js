const fs = require("fs");
const path = require("path");
const {uid: uid} = require("uid");

const semesterFolderParh = path.join(__dirname, "storage", "Semesters");

//only admin

//create
function set(semester) {
    try {
        semester.id = uid(16);
        const filePath = path.join(semesterFolderParh, `${semester.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(semester), "utf8");
        return semester;
    } catch (error) {
        throw { code: "failedToCreateSemester", message: error.message };
    }
}
//remove
function remove(semesterId) {
    try {
        const filePath = path.join(semesterFolderParh, `${semesterId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        throw { code: "failedToRemoveSemester", message: error.message };
    }
}
//update
function update(semester) {
    try {
        const filePath = path.join(semesterFolderParh, `${semester.id}.json`);
        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, JSON.stringify(semester), "utf8");
    } catch (error) {
        throw { code: "failedToUpdateSemester", message: error.message };
    }
}
//get
function get(semesterId) {
    try {
        const semesterlist = list();
        for (const [key, value] of Object.entries(semesterlist)) {
            if (value.id === semesterId) {
                return value;
            }
        }
        return { code: "failedToFindSemester", message: error.message }
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll
function list() {
    try {
        let semesterMap = {};
        const filesList = fs.readdirSync(semesterFolderParh);
        filesList.forEach(element => {
            data = fs.readFileSync(path.join(semesterFolderParh, element));
            const ndata = JSON.parse(data);
            semesterMap[ndata.id] = ndata;
        });
        return semesterMap;
    } catch (error) {
        throw { code: "failedToReadSemester", message: error.message };
    }
}

module.exports = {
    get,
    set,
    update,
    remove,
    list
}