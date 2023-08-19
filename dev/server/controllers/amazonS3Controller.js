const AWS = require('aws-sdk');
const Audio = require('../models/audio');
require('dotenv').config();

// Amazon S3 instance
const s3 = new AWS.S3({
    accessKeyId: String(process.env.s3_access_key),
    secretAccessKey: String(process.env.s3_secret_access_key),
    region: String(process.env.s3_bucket_region)
});

async function uploadAudio(req, res) {
    const { userID } = req.body;
    console.log("Received userID:", userID);
    const file = req.file;
    const params = {
        Key: (userID ? "" : "guest/") + file.originalname,
        Bucket: process.env.s3_bucket_name,
        Body: file.buffer,
        ContentType: 'audio/mpeg'
    };

    try {
        // upload to s3
        const result = await s3.upload(params).promise();
        // if user is logged in, save to mongoDB
        if (userID) {
            // creating mongoDB object
            const audio = new Audio({
                title: file.originalname,
                link: result.Location,
                userID: userID,
                guest: false
            });
            console.log(audio);
            // uploading to mongoDB
            await audio.save();
        }
        res.status(201).json(result);
    } catch (err) {
        console.error('Error in uploadAudio:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadAudio };

