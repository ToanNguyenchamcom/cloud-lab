const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Student = require('./Student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
if (!MONGODB_URI) {
  console.error('❌ Lỗi: Biến môi trường MONGODB_URI chưa được thiết lập!');
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối thành công đến MongoDB Atlas'))
    .catch((err) => console.error('❌ Lỗi kết nối MongoDB Atlas:', err.message));
}

// 1. Route kiểm tra server (Câu 45)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend Express đang chạy từ Docker Container!' });
});

// 2. GET: Lấy danh sách tất cả sinh viên (Câu 46, 74)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách sinh viên', error: error.message });
  }
});

// 3. POST: Thêm sinh viên mới (Câu 75)
app.post('/api/students', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    if (!studentId || !name || !email) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ MSSV, Họ tên và Email' });
    }

    const newStudent = new Student({ studentId, name, email });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi thêm sinh viên', error: error.message });
  }
});

// 4. PUT: Cập nhật thông tin sinh viên (Câu 77)
app.put('/api/students/:id', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { studentId, name, email },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật sinh viên', error: error.message });
  }
});

// 5. DELETE: Xóa sinh viên (Câu 78)
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên để xóa' });
    }

    res.status(200).json({ message: 'Xóa sinh viên thành công', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa sinh viên', error: error.message });
  }
});

// Khởi chạy server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server đang lắng nghe tại cổng ${PORT}`);
});