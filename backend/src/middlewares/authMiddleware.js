const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Lấy header Authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    // Kiểm tra định dạng Bearer token
    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    const token = tokenParts[1]; // Lấy token từ header

    try {
        // Xác thực token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Thêm thông tin người dùng vào request
        next(); // Chuyển đến handler tiếp theo
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
