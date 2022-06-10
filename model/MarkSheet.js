const mongoose = require("mongoose")

const MarkSheet = mongoose.Schema({
    StudentID: {
        type: String,
        unique: true,
        required : true,

    },
    Algorithms:{
        type: Number,
        default: 0,
        
    },
    OperatingSystems:{
        type: Number,
        default: 0
    },
    CompilerDesign:{
        type: Number,
        default: 0,
    },
    DatabaseManagement:{
        type: Number,
        default:0
    },
    ComputerNetworks:{
        type: Number,
        default: 0
    },

    TotalMarks:{
        type: Number
        
    }


})

module.exports = mongoose.model("Marksheet", MarkSheet, "Marksheet")