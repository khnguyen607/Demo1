const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  marketing,
  userPerformance,
  teamPerformance,
  bonus,
  userReview,
  getDashboard,
  getIncomeDaily,
} = require("../controllers/getReportController");

const router = express.Router();

// Định nghĩa các route
router.get("/marketing", authMiddleware, marketing);
router.get("/userPerformance", authMiddleware, userPerformance);
router.get("/teamPerformance", authMiddleware, teamPerformance);
router.get("/bonus", authMiddleware, bonus);
router.get("/userReview", authMiddleware, userReview);
router.post("/getDashboard", authMiddleware, getDashboard);
router.post("/getIncomeDaily", authMiddleware, getIncomeDaily);

module.exports = router;
