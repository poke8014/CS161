const AWS = require('aws-sdk');
const Audio = require('../models/audio');
const { s3_access_key, s3_secret_access_key } = require("../../config/config.json");

// Amazon S3 instance
const s3 = new AWS.S3({
    accessKeyId: String(s3_access_key),
    secretAccessKey: String(s3_secret_access_key)
});

async function uploadAudio(req, res) {
    try {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read' 
        };

        const link = await s3.upload(params).promise();
        const audio = new Audio({
            title: filename,
            link: Location
        });
        const saveAudio = await audio.save();

        res.status(201).json(saveAudio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// not sure what file this goes in

// TODO: Add audio information to mongoDB

module.exports = { uploadAudio };

