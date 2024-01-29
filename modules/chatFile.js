const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

exports.uploadFiles = multer({
  storage: multerS3({
    s3: s3,
    bucket: "popol5",
    key: function (요청, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now().toString() + ext);
    },
  }),
// 파일 형식 최대 용량 50mb
  limits: { fileSize: 50 * 1024 * 1024 },
});









