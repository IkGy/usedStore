const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb'); 

router.get('/chat', async (req, res) => {
  console.log("/chat");
  try {
    const db = getDB();
    console.log(req.query);
    let chat_log = await db.collection("chatting").find({room_id: req.query.room_id}).toArray()
    console.log("chat_log: ", chat_log);
    res.status(201).send(chat_log);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send('채팅 내역 불러오기 실패')
  }
})

router.post('/live_chat', async (req,res)=>{
  const db = getDB();
    await db.collection("chatting").insertOne({
      room_id: req.body.room_id,
      writer: req.body.writer,
      chat: req.body.chat,
      create_at:new Date(),
    })
    .then((result)=>{
      res.status(201).end();
    })
    .catch((err)=>{
      console.error(err);
      res.status(501).send(err);
    })
})


module.exports = router;