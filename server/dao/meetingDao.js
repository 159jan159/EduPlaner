const fs = require("fs");
const path = require("path");
const {uid: uid} = require("uid");

const meetingFolderPath = path.join(__dirname, "storage", "Meetings");

//create
function set(meeting) {
    //TODO - do i reallz need? check if uset id  allready exists return error orher way we would overwrite user 
    try {
        meeting.id = uid(16);
        const filePath = path.join(meetingFolderPath, `${meeting.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(meeting), "utf8");
        return meeting;
    } catch (error) {
        throw { code: "failedToCreateMeeting", message: error.message };
    }
}
//remove
function remove(meetingId) {
    try {
        const filePath = path.join(meetingFolderPath, `${meetingId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        throw { code: "failedToRemoveMeeting", message: error.message };
    }
}
//update
function update(meeting) {
    try {
        const filePath = path.join(meetingFolderPath, `${meeting.id}.json`);
        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, JSON.stringify(meeting), "utf8");
    } catch (error) {
        throw { code: "failedToUpdateMeeting", message: error.message };
    }
}
//get
function get(meetingId) {
    try {
        const meetingList = list();
        for (const [key, value] of Object.entries(meetingList)) {
            if (value.id === meetingId) {
                return value;
            }
        }
        return { code: "failedToFindMeeting", message: error.message }
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

//getAll
function list() {
    try {
        let meetingMap = {};
        const filesList = fs.readdirSync(meetingFolderPath);
        filesList.forEach(element => {
            data = fs.readFileSync(path.join(meetingFolderPath, element));
            const ndata = JSON.parse(data);
            meetingMap[ndata.id] = ndata;
        });
        return meetingMap;
    } catch (error) {
        throw { code: "failedToReadMeetings", message: error.message };
    }
}

module.exports = {
    get,
    set,
    update,
    remove,
    list
}