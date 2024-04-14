const fs = require("fs");
const path = require("path");
const {uid: uid} = require("uid");

const taskFolderPath = path.join(__dirname, "storage", "Tasks");

//create
function set(task) {
    //TODO - do i reallz need? check if uset id  allready exists return error orher way we would overwrite user 
    try {
        task.id = uid(16);
        const filePath = path.join(taskFolderPath, `${task.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(task), "utf8");
        return task;
    } catch (error) {
        throw { code: "failedToCreateTask", message: error.message };
    }
}
//remove
function remove(taskId) {
    try {
        const filePath = path.join(taskFolderPath, `${taskId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        throw { code: "failedToRemoveTask", message: error.message };
    }
}
//update
function update(task) {
    try {
        const filePath = path.join(taskFolderPath, `${task.id}.json`);
        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, JSON.stringify(task), "utf8");
    } catch (error) {
        throw { code: "failedToUpdateTask", message: error.message };
    }
}
//get
function get(taskId) {
    try {
        const taskList = list();
        for (const [key, value] of Object.entries(taskList)) {
            if (value.id === taskId) {
                return value;
            }
        }
        return { code: "failedToFindTask", message: error.message }
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll
function list() {
    try {
        let taskMap = {};
        const filesList = fs.readdirSync(taskFolderPath);
        filesList.forEach(element => {
            data = fs.readFileSync(path.join(taskFolderPath, element));
            const ndata = JSON.parse(data);
            taskMap[ndata.id] = ndata;
        });
        return taskMap;
    } catch (error) {
        throw { code: "failedToReadTasks", message: error.message };
    }
}

module.exports = {
    get,
    set,
    update,
    remove,
    list
}