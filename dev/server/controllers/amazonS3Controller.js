const AWS = require('aws-sdk');
const { s3_access_key, s3_secret_access_key } = require("../../config/config.json");

// Middleware temporary storage that gives access to the 
// file so we can upload to S3 without writing to disk
const multer = require('multer');
const { memoryStorage } = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });

// create a bucket
// route post
// data

// Amazon S3 instance
const s3 = new AWS.S3({
    accessKeyId: String(s3_access_key),
    secretAccessKey: String(s3_secret_access_key)
});

// not sure what file this goes in


const uploadAudio = (filename, bucketname, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read' 
        };
    
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const app = express();
app.post('/uploadAudio', upload.single('audiofile'), async (req, res) => {
    const filename = 'my first upload';
    const bucketname = 'audiovision';
    const file = req.file.buffer;
    console.log(file);
    const link = await uploadAudio(filename, bucketname, file);
    console.log(link);
    res.send('uploaded successfully...')
});

