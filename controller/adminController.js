const Student = require("../model/Student")
const MarkSheet = require("../model/MarkSheet")
const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const Admin = require("../model/Admin")

exports.createStudent = (req, res) => {
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
}

exports.createAdmin = (req, res) => {
    let {
        AdminID,
        FirstName,
        LastName,
        DOB,
        Gender
    } = req.body
    let admin = new Admin({
        AdminID,
        FirstName,
        LastName,
        DOB,
        Gender,
    })
    admin.save().then(() => {
        const token = getToken(admin);
        return res.status(200).send({
            admin,
            token
        });

    }).catch((error) => {
        console.error(error);
        return res.status(500).send("Error")
    })
}

exports.LoginAdmin = (req,res)=>{
    let{AdminID} = req.body
    Admin.findOne({AdminID:AdminID}).then((user)=>{

        const token = getToken(user);

        console.info("login done");
        return res.status(200).send({ user, token });
      
    }).catch((error)=>{
        return res.status(404).send(`${AdminID} doesnt exist`);
    })
}





exports.createMarklist = (req, res) => {
    let {
        StudentID,
        Algorithms,
        OperatingSystems,
        CompilerDesign,
        DatabaseManagement,
        ComputerNetworks,


    } = req.body;
    let TotalMarks = Algorithms + OperatingSystems + CompilerDesign + DatabaseManagement + ComputerNetworks


    Student.findOne({
        StudentID: StudentID
    }).then((student) => {
        if (!student) {
            return res.status(500).send(`Student with ID ${StudentID} does not exist in the System.`)
        }
        let markSheet = new MarkSheet({
            StudentID,
            Algorithms,
            OperatingSystems,
            CompilerDesign,
            DatabaseManagement,
            ComputerNetworks,
            TotalMarks
        })
        markSheet.save().then(() => {
            console.log("Save")
            return res.status(200).send("Marksheet Created")

        }).catch((error) => {
            console.log(error)
            return res.status(500).send("Cannot Insert Records")
        })
    }).catch((error) => {
        return res.status(500).send(error)

    })


}


exports.updateAdmin = (req, res) => {
    let adminId = req.params.id
    let { FirstName, LastName } = req.body;
    // let FirstName = req.body.FirstName
    // let LastName = req.body.LastName
    Admin.updateOne({ AdminID: adminId }, { $set: { FirstName, LastName } })
      .then((updateResult) => {
        
          console.info("Admin was successfully updated.");
          return res.status(200).send("Admin was successfully updated.");
      })
      .catch((error) => {
        console.error("There was an error while updating user.", error);
        return res.status(500).send("ERROR");
      });
  };


const getToken = (admin) => {
    return (token = JWT.sign({
            AdminID: admin.AdminID,
        },
        "CelebalSecretKey", {
            expiresIn: "10h",
        }
    ));
};