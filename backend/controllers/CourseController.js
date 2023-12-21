const AuditLog = require("../models/AuditLog");
const Course = require("../models/Course");

const CourseController = {
  async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll({ where: { archive: false } });
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async createCourse(req, res) {
    try {
      console.log("sdasdasdas");
      const courseData = req.body;

      if (Array.isArray(courseData)) {
        const existingTitles = await Course.findAll({
          where: { title: courseData.map((course) => course.title) },
        });

        const duplicateTitles = existingTitles.map((course) => course.title);

        if (duplicateTitles.length > 0) {
          const uniqueCourses = courseData.filter(
            (course) => !duplicateTitles.includes(course.title)
          );

          const createdCourses = await Course.bulkCreate(uniqueCourses);

          return res.status(201).json({
            message: "One or more courses with the same title already exist.",
            duplicates: duplicateTitles,
            createdCourses,
          });
        } else {
          const createdCourses = await Course.bulkCreate(courseData);
          return res.status(201).json({
            message: "Successfully added!",
            createdCourses,
          });
        }
      } else {
        const [newCourse, created] = await Course.findOrCreate({
          where: { title: courseData.title },
          defaults: courseData,
        });

        if (!created) {
          return res.status(201).json({
            message: "Course with the same title already exists.",
            duplicates: newCourse,
          });
        }

        return res.status(200).json(newCourse);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async updateCourse(req, res) {
    const courseId = req.params.id;
    try {
      await Course.updateWithAuditing(courseId, req.body);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      if (error.message === "Course not found") {
        return res.status(201).json({ message: "Course not found" });
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
  async archiveCourseById(req, res) {
    const courseId = req.params.id;

    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      course.archive = true;
      await course.save();

      res.json({ message: "Course archived successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateCourseDetails(req, res) {
    const courseId = req.params.id;
    const { category, department } = req.body;

    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      course.category = category || course.category;
      course.department = department || course.department;

      await course.save();

      res.json({ message: "Course details updated successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getAllArchivedCourses(req, res) {
    try {
      const archivedCourses = await Course.findAll({
        where: { archive: true },
      });

      res.json(archivedCourses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getAllAudits(req, res) {
    try {
      const auditLogs = await AuditLog.findAll({
        order: [["dateCreated", "DESC"]],
      });

      res.json(auditLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = CourseController;
