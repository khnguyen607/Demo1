const express = require("express");
const {
  getAlls,
  getById,
  createModel,
  updateModel,
  deleteModel,
} = require("../controllers/branchController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các route
router.get("/", authMiddleware, getAlls);
router.get("/:id", authMiddleware, getById);
router.post("/", authMiddleware, createModel);
router.put("/:id", authMiddleware, updateModel);
router.delete("/:id", authMiddleware, deleteModel);

module.exports = router;
