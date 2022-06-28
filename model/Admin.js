const mongoose = require("mongoose")

const Admin = mongoose.Schema({
    AdminID: {
        type: String,
        unique: true,
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


})

module.exports = mongoose.model("Admin", Admin, "Admin");