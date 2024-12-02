const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SaleReports = sequelize.define(
  "SaleReports",
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    newIncome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldIncome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sale_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  }
);

module.exports = SaleReports;
