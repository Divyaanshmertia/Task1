const express = require("express");
const router = express();
const middleware = require("../middleware/TokenValidation")
const studentControllers = require("../controller/studentController");
router.get("/student/Login", studentControllers.LoginStudent )
router.get("/student/me", middleware.canViewStudent, studentControllers.getStudentData);
router.put("/student/update", middleware.canViewStudent,studentControllers.updateStudent)
module.exports = router
