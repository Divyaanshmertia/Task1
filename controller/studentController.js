const Student = require("../model/Student")
const MarkSheet = require("../model/MarkSheet")
const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const Admin = require("../model/Admin")

exports.LoginStudent = (req,res)=>{
    let{StudentID} = req.body
    Student.findOne({StudentID:StudentID}).then((student)=>{

        const token = getToken(student);

        console.info("login done");
        return res.status(200).send({token});
      
    }).catch(()=>{
        return res.status(404).send(`${StudentID} doesnt exist`);
    })
}


exports.getStudentData = (req, res, next) => {
    
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
    Student.findOne({StudentID:decodedToken.StudentID}).then((student)=>{
        {
          return res.status(200).send(student)
        }
    }).catch((error)=>{
      return res.status(500).send(error)
    })
    
    
  } 

  exports.updateStudent = (req, res) => {
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");

    let { FirstName, LastName, DOB, Gender, Year } = req.body;
    Student.updateOne({ StudentID: decodedToken.StudentID }, { $set: { FirstName, LastName, DOB, Gender, Year } })
    .then((updateResult) => {
        
        console.info("Student information was successfully updated.");
        return res.status(200).send("Student information was successfully updated.");
    })
    .catch((error) => {
      console.error("There was an error while updating user.", error);
      return res.status(500).send("ERROR");
    });
};


exports.results = (req,res) =>{
    
    const filters = req.query
    
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
    MarkSheet.findOne({StudentID:decodedToken.StudentID}).then((student)=>{
        {
           return res.status(200).send(student)
           
          }
      }).catch((error)=>{
        return res.status(500).send(error)
      })
      
      
    } 
  
//         const result = {}
//         { 
//             for (key in filters){
//                 result.key = student.key
//             }
            
//           console.log(result)
//         }
//     }).catch((error)=>{
//       return res.status(500).send(error)
//     })

// }





const getToken = (student) => {
    return (token = JWT.sign({
            StudentID: student.StudentID,
        },
        "CelebalSecretKey", {
            expiresIn: "10h",
        }
    ));
};
