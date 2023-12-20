const express = require("express");
const CourseController = require("./controllers/CourseController");

const router = express.Router();

// User
router.get("/course", CourseController.getAllCourses);
router.get("/course/:id", CourseController.getCourseById);
router.post("/course/add", CourseController.createCourse);
router.patch("/course/:id", CourseController.updateCourse);

module.exports = router;
