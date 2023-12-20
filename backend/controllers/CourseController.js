const Course = require("../models/Course");

const CourseController = {
  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async createCourse(req, res) {
    try {
      const { title, description, startDate, endDate, instructor, capacity } =
        req.body;

      const newCourse = await Course.create({
        title,
        description,
        startDate,
        endDate,
        instructor,
        capacity,
      });

      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateCourse(req, res) {
    const courseId = req.params.id;
    try {
      await Course.updateWithAuditing(courseId, req.body);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      if (error.message === "Course not found") {
        return res.status(404).json({ message: "Course not found" });
      }
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getCourseById(req, res) {
    const courseId = req.params.id;

    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = CourseController;
