const Modal = require("../models/income_reports");

// Lấy danh sách tất cả
const getAlls = async (req, res) => {
  try {
    const datas = await Modal.findAll();
    res.status(200).json({
      message: "Retrieved successfully",
      data: datas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy theo ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({
      message: "Retrieved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo mới
const createModel = async (req, res) => {
  try {
    const { userId, position, tern, income } = req.body;

    const data = await Modal.create({
      userId,
      position,
      tern,
      income,
    });

    res.status(201).json({
      message: "Created successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật theo ID
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, position, tern, income } = req.body;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    // Cập nhật dữ liệu
    await data.update({
      userId,
      position,
      tern,
      income,
    });

    res.status(200).json({
      message: "Updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa theo ID
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    // Xóa
    await data.destroy();

    res.status(204).send(); // Thành công nhưng không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm controller
module.exports = {
  getAlls,
  getById,
  createModel,
  updateModel,
  deleteModel,
};
