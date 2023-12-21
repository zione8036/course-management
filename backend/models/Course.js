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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
      const oldValue = course[field].toString();
      await AuditLog.create({
        columnId: id,
        table: "course",
        changedField: field,
        oldValue,
        newValue: data[field],
      });
    }
  }

  await course.update(data);
};

module.exports = Course;
