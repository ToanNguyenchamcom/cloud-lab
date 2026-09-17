const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});