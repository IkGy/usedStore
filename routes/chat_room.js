const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb'); 
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { uploadFiles } = require("../modules/chatFile");
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});


const chatImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: "popol5",
    key: function (요청, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now().toString() + ext);
    },
  }),
});

router.post('/open_chat', async (req, res) => {
  const db = getDB();
  const users = req.body.user
  // console.log('users: ', users);
  // console.log('users: ', users[0], users[1]);
  
  try {
    let resss = await db.collection('chattingroom').find({
      user: {$all: users}
    }).toArray();
    console.log('resss: ', resss);
    if(resss && resss.length > 0) {
      console.log("이미 채팅방이 존재합니다.");
      res.status(200).send('기존 채팅방으로 연결합니다.');
    }
    else {
      console.log("채팅방 생성");
      await db.collection("chattingroom").insertOne({
        user: users,
        create_at: new Date(),
      })
      .then((result)=>{
        res.status(201).end();
      })
      .catch((err)=>{
        console.error(err);
        res.status(501).send(err);
      })
    }
  }
  catch (error){
    console.log('error: ', error)
    res.status(500).send('채팅방 개설 실패');
  }
})


router.get('/chat', async (req, res) => {
  try {
    const db = getDB();
    console.log(req.query);
    let chat_log = await db.collection("chatting").find({room_id: req.query.room_id}).toArray()
    // console.log("chat_log: ", chat_log);
    res.status(201).send(chat_log);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send('채팅 내역 불러오기 실패')
  }
})



router.post('/live_chat', chatImages.array('img', 10), async (req,res)=>{
  const db = getDB();
  // console.log('chatImages: ', chatImages);
  // console.log("req.body: ", req.body);
  // console.log("req.query: ", req.query);
  // console.log("req.files: ", req.files);
  // const Images = req.files.map((file) => file.location);
  // console.log('Images: ', Images);

  await db.collection("chatting").insertOne({
    room_id: req.body.room_id,
    writer: req.body.writer,
    chat: req.body.chat,
    images: req.body.images,
    create_at: new Date(),
  })
  .then((result)=>{
    res.status(201).end();
  })
  .catch((err)=>{
    console.error(err);
    res.status(501).send(err);
  })
})

router.post('live_chat_upload_file_to_s3', uploadFiles.array("file"), (req, res, next) => {
  let urlArr = [];
  req.files.forEach(async (v) => {
    urlArr.push(v.location);
  });
  res.send(urlArr);
});



module.exports = router;