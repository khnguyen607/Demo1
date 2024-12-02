const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRET_KEY;
// const User = require("../models/users");
const { User, Team, Branch } = require("../config/associations");

// Lấy tất cả người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Team, attributes: ["name"] },
        { model: Branch, attributes: ["name"] },
      ],
      raw: true,
    });
    const formattedUsers = users.map((user) => ({
      ...user,
      team: user["Team.name"],
      branch: user["Branch.name"],
    }));
    res.status(200).json({
      message: "Users retrieved successfully",
      data: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = null;
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phone,
      position,
      teamId,
      branchId,
      role,
      status,
    } = req.body;

    // Hash mật khẩu
    const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

    // Tạo người dùng mới
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      position,
      teamId,
      branchId,
      role,
      status,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ where: { email, status: "Working" } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // So sánh mật khẩu đã hash
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Tạo token JWT
    const access_token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "24h", // Token hết hạn sau 1 giờ
      }
    );

    const role =
      user.role == "ADMIN"
        ? [
            {
              action: "manage",
              subject: "all",
            },
          ]
        : [
            {
              action: "read",
              subject: "ACL",
            },
            {
              action: "read",
              subject: "Auth",
            },
          ];
    res.status(200).json({
      message: "Login successful",
      userData: {
        email: user.email,
        name: user.name,
        role: user.role,
        ability: role,
        teamId: user.teamId,
        branchId: user.branchId,
        id: user.id,
        position: user.position,
      },
      access_token, // Trả về token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      password,
      name,
      phone,
      position,
      teamId,
      branchId,
      role,
      status,
    } = req.body;

    const user = await User.findByPk(id); // Tìm người dùng theo ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = password
      ? await bcryptjs.hash(password, SALT_ROUNDS)
      : null;

    // Cập nhật thông tin người dùng
    await user.update({
      email,
      ...(password !== null && { password: hashedPassword }),
      name,
      phone,
      position,
      teamId,
      branchId,
      role,
      status,
    });
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id); // Tìm người dùng theo ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm CRUD
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
