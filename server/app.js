const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

const userController = require("./controller/usr.js");

app.use("/usr", userController);

const dao = require("./dao/userDao.js");

app.get('/', (req, res) => {
    console.log(dao.set())
    res.send('Hello World!')
    console.log(dao.get("1"))

})

app.post('/usr/add', (req, res) => {
    console.log(req.query)
    res.send(dao.set({
        id: "",
        name: "Joee",
        surname: "Doe",
        email: "joe.doe@mail.com",
        password: "1234",
        role: "1"
    }));
})

app.get('/usr/rm', (req, res) => {
    dao.update({"id":123,"name":"Joee","surname":"Doe","email":"joee.doe@mail.com","password":"1234","role":"1"})});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})