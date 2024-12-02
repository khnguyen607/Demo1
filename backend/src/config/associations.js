const User = require("../models/users");
const Team = require("../models/teams");
const Branch = require("../models/branches");
const BonusReport = require("../models/bonus_reports");
const IncomeReport = require("../models/income_reports");
const MarketingReport = require("../models/marketing_reports");
const MonthReport = require("../models/month_reports");
const SaleReport = require("../models/sale_reports");

// Thiết lập quan hệ giữa User và Team
User.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(User, { foreignKey: "teamId" });

// Thiết lập quan hệ giữa User và Branch
User.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(User, { foreignKey: "branchId" });

// Thiết lập quan hệ giữa MarketingReport và User
MarketingReport.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
User.hasMany(MarketingReport, { foreignKey: "userId" });
MarketingReport.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(MarketingReport, { foreignKey: "branchId" });

module.exports = {
  User,
  Team,
  Branch,
  BonusReport,
  IncomeReport,
  MarketingReport,
  MonthReport,
  SaleReport,
};
