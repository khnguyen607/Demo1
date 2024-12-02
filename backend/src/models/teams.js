const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Teams = sequelize.define(
  "Teams",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

module.exports = Teams;
