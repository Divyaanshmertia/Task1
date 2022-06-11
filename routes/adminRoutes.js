const express = require("express");
const router = express();
const middleware = require("../middleware/TokenValidation")
const adminControllers = require("../controller/adminController");
router.post("/admin/addStudent", middleware.canAddStudent, adminControllers.createStudent);
router.put("/admin/update/:id", middleware.canEditAdmin, adminControllers.updateAdmin);
router.post("/admin/addMarklist",adminControllers.createMarklist )
router.post("/admin/addAdmin", adminControllers.createAdmin)
router.get("/admin/Login", adminControllers.LoginAdmin)
router.put("/admin/students/:id", middleware.canAddStudent,adminControllers.updateStudent )
router.delete("/admin/students/:id", middleware.canAddStudent,adminControllers.deleteStudentMarkSheet,adminControllers.deleteStudentRecord)
module.exports = router