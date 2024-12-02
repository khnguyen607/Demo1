const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const IncomeReports = sequelize.define(
  "IncomeReports",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tern: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "income_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

module.exports = IncomeReports;
