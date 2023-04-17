const AWS = require('aws-sdk');
const Audio = require('../models/audio');
const { s3_access_key, s3_secret_access_key, s3_bucket_region, s3_bucket_name } = require("../../config/config.json");

// Amazon S3 instance
const s3 = new AWS.S3({
    accessKeyId: String(s3_access_key),
    secretAccessKey: String(s3_secret_access_key),
    region: String(s3_bucket_region)
});

async function uploadAudio(req, res) {
    const params = {
        Key: req.originalname,
        Bucket: s3_bucket_name,
        Body: req.buffer,
        ContentType: 'audio/mpeg'
    };

    try {
        // upload to s3
        const result = await s3.upload(params).promise();
        // creating mongoDB object
        const audio = new Audio({
            title: req.originalname,
            link: result.Location
        });
        // uploading to mongoDB
        // const saveAudio = await audio.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadAudio };

