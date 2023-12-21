const express = require("express");
const CourseController = require("./controllers/CourseController");

const router = express.Router();

router.get("/course/all", CourseController.getAllCourses);
router.get("/course/archive/all", CourseController.getAllArchivedCourses);
router.get("/course/audit/all", CourseController.getAllAudits);
router.get("/course/:id", CourseController.getCourseById);
router.post("/course/add", CourseController.createCourse);
router.patch("/course/:id", CourseController.updateCourse);
router.put("/course/:id", CourseController.archiveCourseById);
router.patch("/course/details", CourseController.updateCourseDetails);

module.exports = router;
