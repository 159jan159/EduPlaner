const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

const userController = require("./controller/usr.js");
const semesterController = require("./controller/semester.js");
const classController = require("./controller/class.js");
const taskController = require("./controller/task.js");
const meetingController = require("./controller/meeting.js");

app.use("/usr", userController);
app.use("/semester", semesterController);
app.use("/class", classController);
app.use("/task", taskController);
app.use("/meeting", meetingController);

app.get('/', (req, res) => {
    res.send('Welcome this is EduPlaner API!')
})

const dashboardAbl = require("./abl/dashboard/dashboard.js");
app.get('/dashboard', (req, res) => {
    dashboardAbl.dashboard(req, res);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})