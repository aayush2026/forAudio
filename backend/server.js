const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Audio = require('./models/audio.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Route to upload audio
app.post('/upload', upload.single('audio'), async (req, res) => {
  const {sid} = req.params;
  try {
    const newAudio = new Audio({
      filePath: req.file.path,
      fileName: req.file.originalname,
      createdAt: new Date(),
    });
    await newAudio.save();
    res.status(201).json({ message: "Audio uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading audio" });
  }
});

// Route to get list of audio files
app.get('/audios', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving audio list" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
