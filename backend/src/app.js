const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bonusReportRoutes = require("./routes/bonusReportRoutes");
const branchRoutes = require("./routes/branchRoutes");
const incomeReportRoutes = require("./routes/incomeReportRoutes");
const marketingReportRoutes = require("./routes/marketingReportRoutes");
const monthReportRoutes = require("./routes/monthReportRoutes");
const saleReportRoutes = require("./routes/saleReportRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const getReportRoutes = require("./routes/getReportRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/bonusReports", bonusReportRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/incomeReports", incomeReportRoutes);
app.use("/api/marketingReports", marketingReportRoutes);
app.use("/api/monthReports", monthReportRoutes);
app.use("/api/saleReports", saleReportRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/getReports", getReportRoutes);

module.exports = app;
