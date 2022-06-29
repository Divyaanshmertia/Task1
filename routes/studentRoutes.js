const express = require("express");
const router = express();
const middleware = require("../middleware/TokenValidation")
const studentControllers = require("../controller/studentController");
router.post("/student/login", studentControllers.LoginStudent )
router.get("/me", middleware.canViewStudent, studentControllers.getStudentData, studentControllers.getStudentMarkList);
router.put("/student/update", middleware.canViewStudent,studentControllers.updateStudent)
router.get("/student/results" ,middleware.canViewStudent, studentControllers.results);
module.exports = router
