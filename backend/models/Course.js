const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const AuditLog = require("./AuditLog");

const Course = sequelize.define(
  "Course",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "dateCreated",
    updatedAt: "dateModified",
    tableName: "courses",
  }
);

Course.updateWithAuditing = async function (id, data) {
  console.log("Before update");
  const course = await Course.findByPk(id);

  if (!course) {
    throw new Error("Course not found");
  }

  const changedFields = Object.keys(data);

  for (const field of changedFields) {
    if (course[field] !== data[field]) {
      await AuditLog.create({
        columnId: id,
        table: "course",
        changedField: field,
        oldValue: course[field],
        newValue: data[field],
      });
    }
  }

  await course.update(data);
};

module.exports = Course;
