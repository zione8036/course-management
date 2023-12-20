const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const AuditLog = sequelize.define(
  "AuditLog",
  {
    columnId: DataTypes.INTEGER,
    changedField: DataTypes.STRING,
    table: DataTypes.STRING,
    oldValue: DataTypes.TEXT,
    newValue: DataTypes.TEXT,
  },
  {
    timestamps: true,
    createdAt: "dateCreated",
    updatedAt: false,
    tableName: "audit_logs",
  }
);

module.exports = AuditLog;
