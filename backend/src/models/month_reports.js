const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MonthReports = sequelize.define(
  "MonthReports",
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
    tern: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ads: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    win: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "month_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "tern"], // Unique constraint cho cột userId và tern
      },
    ],
  }
);

module.exports = MonthReports;
