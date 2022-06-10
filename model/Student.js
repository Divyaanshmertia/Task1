const mongoose = require("mongoose")

const Student = mongoose.Schema({
    StudentID: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Year: {
        type: Number,
        required: true,

    }


})

module.exports = mongoose.model("Student", Student, "Student");