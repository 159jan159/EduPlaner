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

app.use("/usr", userController);
app.use("/semester", semesterController);
app.use("/class", classController);

app.get('/', (req, res) => {
    res.send('Welcome this is EduPlaner API!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})