const express = require('express');
const router = express.Router();
const Audio = require('../models/audio');
const multer = require('multer');
const { memoryStorage } = require('multer');
const { uploadAudio } = require('../controllers/amazonS3Controller')

// Middleware temporary storage that gives access to the 
// file so we can upload to S3 without writing to disk
const storage = memoryStorage();
const upload = multer({ storage });

// Getting all audio files
router.get('/', async (req, res) => {
    try {
        const audioFiles = await Audio.find();
        res.json(audioFiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/uploadAudio', upload.single('audiofile'), async (req, res) => {
    const filename = 'my first upload';
    const bucketname = 'audiovision';
    const file = req.file;
    try {
        const link = await uploadAudio(filename, bucketname, file);
        res.json(link);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;