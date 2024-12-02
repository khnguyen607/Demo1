const { sequelize } = require("../config/database");

const marketing = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_marketing_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userPerformance = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_user_performance_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const teamPerformance = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_team_performance_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bonus = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_bonus_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userReview = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_user_review_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const { tern } = req.body;
    const sql = `CALL GetDashboard ('${tern}');`;
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncomeDaily = async (req, res) => {
  try {
    // tern: 2024-11
    const { tern } = req.body;
    const sql = `CALL GetIncomeDaily ('${tern}');`;
    const datas = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Dữ liệu chính xác
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm controller
module.exports = {
  marketing,
  userPerformance,
  teamPerformance,
  bonus,
  userReview,
  getDashboard,
  getIncomeDaily,
};
