const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueId = Date.now().toString();
      const fileName = `${uniqueId}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

module.exports = { upload };
