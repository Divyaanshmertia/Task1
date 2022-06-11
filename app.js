const express = require("express")
const app = express()
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes")
const mongoose = require("mongoose")
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())



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

app.use(adminRoutes);
app.use(studentRoutes);


const Port = 9160;
app.listen(Port, () => {
    console.log(`Connection Established with port number: ${Port}`)
})


  