require("dotenv").config(); // Thêm dòng này ở đầu file
const app = require("./app");
const { connectDB } = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // Kết nối cơ sở dữ liệu
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
