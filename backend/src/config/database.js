const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load biến môi trường

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Tắt log SQL
    timezone: "+07:00",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error(process.env.DB_HOST);
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
