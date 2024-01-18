const express = require('express');
const router = express.Router();

const { getDB } = require('../db');
const { ObjectId } = require('mongodb'); 

router.get('/chat_room', async (req, res) => {
  try {
    const db = getDB();
    let chat_log = await db.collection("chatting")
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send('채팅 내역 불러오기 실패')
  }
})

