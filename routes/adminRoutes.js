const express = require("express");
const router = express();
const middleware = require("../middleware/TokenValidation")
const adminControllers = require("../controller/adminController");

router.post("/admin/addAdmin", adminControllers.createAdmin)

router.post("/admin/login", adminControllers.LoginAdmin)

router.put("/admin/update/:id", middleware.canEditAdmin, adminControllers.updateAdmin);

router.post("/admin/addStudent", middleware.canAddStudent, adminControllers.createStudent);

router.post("/admin/addMarkSheet",adminControllers.createMarklist )

router.put("/admin/students/:id", middleware.canAddStudent,adminControllers.updateStudentRecord )

router.delete("/admin/delete/student/:id", middleware.canAddStudent,adminControllers.deleteStudentMarkSheet,adminControllers.deleteStudentRecord)

module.exports = router