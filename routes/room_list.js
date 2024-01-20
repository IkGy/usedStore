const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb'); 

router.get('/room_list', async (req, res) => {
  try {
    const db = getDB();
    let room_li = await db.collection("chattingroom")
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send('채팅 내역 불러오기 실패')
  }
})





module.exports = router;