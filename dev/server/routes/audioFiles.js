const express = require('express');
const router = express.Router();
const Audio = require('../models/audio');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { memoryStorage } = require('multer');
const { uploadAudio } = require('../controllers/amazonS3Controller')
// const testAudio = require('../audio/TheFatRat - Fly Away feat. Anjulie [cMg8KaMdDYo].opus')

const AWS = require('aws-sdk');
const { s3_access_key, s3_secret_access_key, s3_bucket_region, s3_bucket_name } = require("../../config/config.json");

// Amazon S3 instance
const s3 = new AWS.S3({
    accessKeyId: String(s3_access_key),
    secretAccessKey: String(s3_secret_access_key),
    region: String(s3_bucket_region)
});

// Middleware temporary storage that gives access to the 
// file so we can upload to S3 without writing to disk
const storage = memoryStorage({
    destination: function(req, file, cb) {
        cb(null, '');
    }
});
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
    const file = req.file;
    await uploadAudio(file, res);
});

module.exports = router;