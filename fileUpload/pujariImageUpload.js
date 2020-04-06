require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region:"ap-south-1"
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'image'});
    },
    key: function (req, file, cb) {
      var newFileName = Date.now() + "-" + file.originalname;
      var fullPath = 'pujari-image/'+ newFileName;
      req.fileKey = fullPath;
      cb(null, fullPath);
    }
  })
});


const deleteImageFile = (fileName) => {
    var params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName
    };
    s3.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted/rollbacked successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });
};


module.exports = {upload, deleteImageFile};
