const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MarketingReports = sequelize.define(
  "MarketingReports",
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
    date: {
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
    tableName: "marketing_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  }
);

module.exports = MarketingReports;
