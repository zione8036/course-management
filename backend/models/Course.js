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
    if (field === "dateModified" || field === "dateCreated") {
      continue;
    }

    let oldValue = course[field].toString();
    let newValue = data[field];
    if (field === "startDate" || field === "endDate") {
      const formattedOldValue = formatDate(course[field]);
      const formattedNewValue = formatDate(data[field]);

      if (formattedOldValue !== formattedNewValue) {
        oldValue = formattedOldValue;
        newValue = formattedNewValue;

        await AuditLog.create({
          columnId: id,
          table: "course",
          changedField: field,
          oldValue,
          newValue,
        });
      }
    } else {
      // For other fields
      if (course[field] !== data[field]) {
        await AuditLog.create({
          columnId: id,
          table: "course",
          changedField: field,
          oldValue,
          newValue,
        });
      }
    }
  }

  await course.update(data);
};

function formatDate(date) {
  if (!date) return "N/A";

  const formattedDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return formattedDate.toLocaleDateString("en-US", options);
}

module.exports = Course;
