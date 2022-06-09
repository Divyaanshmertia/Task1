const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


const Student = require("./model/Student")

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/Celebal", {
        useUnifiedTopology: true,
        useNewUrlParser: true,

    }).then(() => {
        console.info("[MongoDB Connected Successfully]");
    })
    .catch((error) => {
        console.error("There was a problem in connecting to the database")
    })
app.get("/", (req, res) => {
    res.status(200).send("Hello world ")
})

// creating Student

app.post("/newStudent", (req, res) => {
    let {
        StudentID,
        FirstName,
        LastName,
        DOB,
        Gender,
        Year
    } = req.body
    let student = new Student({
        StudentID,
        FirstName,
        LastName,
        DOB,
        Gender,
        Year,
    })
    student.save().then(() => {
        return res.status(200).send({
            student
        });

    }).catch((error) => {
        console.error(error);
        return res.status(500).send("Error")
    })
})


const Port = 9160;
app.listen(Port, () => {
    console.log(`Connection Established with port number: ${Port}`)
})