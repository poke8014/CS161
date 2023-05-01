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
    const { userID } = req.body;
    console.log("Received userID:", userID);
    const file = req.file;
    const params = {
        Key: file.originalname,
        Bucket: s3_bucket_name,
        Body: file.buffer,
        ContentType: 'audio/mpeg'
    };

    try {
        // upload to s3
        const result = await s3.upload(params).promise();
        // creating mongoDB object
        const audio = new Audio({
            title: file.originalname,
            link: result.Location,
            userID: userID && userID !== "null" ? userID : undefined,
            guest: !userID || userID === "null" ? true : false
        });
        console.log(audio);
        // uploading to mongoDB
        await audio.save();
        res.status(201).json(result);
    } catch (err) {
        console.error('Error in uploadAudio:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadAudio };

