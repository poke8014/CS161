const express = require('express');
const router = express.Router();
const Audio = require('../models/audio');
const multer = require('multer');
const { memoryStorage } = require('multer');
const { uploadAudio } = require('../controllers/amazonS3Controller');

// Middleware temporary storage that gives access to the 
// file so we can upload to S3 without writing to disk
const storage = memoryStorage();
const upload = multer({ storage });

// Getting all audio files
// router.get('/', async (req, res) => {
//     try {
//         const audioFiles = await Audio.find();
//         res.json(audioFiles);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//get existing audios for guest
router.get('/existingAudioFiles', async (req, res) => {
    try {
        const audioFiles = await Audio.find({menu_audio : true});
        res.json(audioFiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// getting user audio files
router.get('/userAudioFiles/:userID', async (req, res) => {
    try {
        const audioFiles = await Audio.find({ userID: req.params.userID });
        res.json(audioFiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/audioByID/:id', async (req, res) => {
  try {
    const audioFile = await Audio.findById(req.params.id);
    if (audioFile) {
      res.json(audioFile);
    } else {
      res.status(404).json({ message: 'Audio file not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//get default audio
router.get('/defaultAudio', async (req, res) => {
    try {
        const audioFiles = await Audio.findOne({menu_audio : true});
        res.json(audioFiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Posting file to s3 and mongoDB
router.post('/uploadAudio', upload.single('audiofile'), async (req, res) => {
    await uploadAudio(req, res);
});

module.exports = router;