const JWT = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Student = require("../model/Student");


// Any Admin can add a student
exports.canAddStudent = (req, res, next) => {
  try {
    if (!req.headers.token) {
      console.error("No token was sent");
      return res.status(403).send("Invalid token");
    }
    const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
    if (decodedToken.AdminID ) {
      return next();
    }
    console.warn("User sent suspicious token!");
    return res.status(417).send("Please send valid token!");
  } catch (error) {
    console.error("Token Validation failed.");
    return res.status(401).send("Token invalid.");
  }
};


exports.canEditAdmin = (req, res, next) => {
    try {
      if (!req.headers.token) {
        console.error("No token was sent");
        return res.status(403).send("Invalid token");
      }
      const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
      
      Admin.findOne({AdminID:decodedToken.AdminID}).then((admin)=>{
          if(!admin){
            console.warn("User sent suspicious token!");
            return res.status(417).send("Please send valid token!");
          }
          {
            return next();
          }
      }).catch((error)=>{
        return res.status(500).send(error)
      })
      
      
    } catch (error) {
      console.error("Token Validation failed.");
      return res.status(401).send("Token invalid.");
    }
  };

  // getting 

  exports.canViewStudent = (req, res, next) => {
    try {
      if (!req.headers.token) {
        console.error("No token was sent");
        return res.status(403).send("Invalid token");
      }
      const decodedToken = JWT.verify(req.headers.token, "CelebalSecretKey");
      
      Student.findOne({StudentID:decodedToken.StudentID}).then((student)=>{
          if(!student){
            console.warn("User sent suspicious token!");
            return res.status(417).send("Please send valid token!");
          }
          {
            return next()
          }
      }).catch((error)=>{
        return res.status(500).send(error)
      })
      
      
    } catch (error) {
      console.error("Token Validation failed.");
      return res.status(401).send("Token invalid.");
    }
  };