const Student = require("../model/Student")
const MarkSheet = require("../model/MarkSheet")
const JWT = require("jsonwebtoken")

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
          res.locals.student = student;
          return next();
        }
    }).catch((error)=>{
      return res.status(500).send(error)
    })
    
    
  }
  exports.getStudentMarkList = (req, res) => {
    
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
    MarkSheet.findOne({StudentID:decodedToken.StudentID}).then((markSheet)=>{
        {
          student = res.locals.student
         return res.status(200).send({student,markSheet})
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
    
    
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
  // An Alternate approach  wherein you need to enter all subjects with value either 0 or 1 if 1 then only it 
  // will display that particular subject

  //   let q = req.query
  //   console.log(q)
  //   Object.keys(q).forEach(function(el){
  //     q[el] = parseInt(q[el])
  //   })
  //   const removeZero = item => (
  //     Object
  //       .keys(item)
  //       .filter(key => item[key] !== 0)
  //       .reduce((newObj, key) => {
  //         newObj[key] = item[key];
  //         return newObj;
  //       }, {})
  //   );
  // const result = removeZero(q);

  //     let newObj = {'_id': 0, ...result};

  let q = (Object.keys(req.query)) // in this approach just pass subject name and will get that particular subject
  //                                NOTE: if passed subjects with any value it will be displayed.
    console.log(q)
    q1 = q[0];
    console.log(q1)
    var object = q.reduce(
      (obj, item) => Object.assign(obj, { [item]: 1 }), {});
      let newObj = {'_id': 0, ...object};
    projection = newObj;
    console.log(projection)
    MarkSheet.findOne({StudentID:decodedToken.StudentID},projection).then((student)=>{
        {

           return res.status(200).send(student)
           
          }
      }).catch((error)=>{
        return res.status(500).send(error)
      })
      
      
    } 

const getToken = (student) => {
    return (token = JWT.sign({
            StudentID: student.StudentID,
        },
        "CelebalSecretKey", {
            expiresIn: "10h",
        }
    ));
};
