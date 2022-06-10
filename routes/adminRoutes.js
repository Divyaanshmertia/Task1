const express = require("express");
const router = express();
const middleware = require("../middleware/TokenValidation")
const adminControllers = require("../controller/adminController");
router.post("/admin/addStudent", middleware.canAddStudent, adminControllers.createStudent);
router.put("/admin/update/:id", middleware.isTokenValid, adminControllers.updateAdmin);
router.post("/admin/addMarklist",adminControllers.createMarklist )
router.post("/admin/addAdmin", adminControllers.createAdmin)
router.get("/admin/Login", adminControllers.LoginAdmin)
module.exports = router