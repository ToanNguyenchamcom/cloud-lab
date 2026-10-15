const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Cấu hình CORS cho môi trường Production
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());

// 1. Kết nối MongoDB Atlas trước
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// 2. Định nghĩa Route API đơn giản (test dữ liệu mẫu hoặc dùng model của bạn)
app.get('/api/students', (req, res) => {
  res.json([
    { id: 1, name: "Nguyen The Toan", mssv: "236939" }
  ]);
});

// 3. Khởi động server ở cuối cùng
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});