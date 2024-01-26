const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');



// 해당 판매자의 고유ID (_id)와 닉네임(nickname) 만 모달창에 보냄
router.get('/post/shop/:id', async (req, res) => {
    try {
        const db = getDB();
        let result = await db.collection("user")
        .findOne({_id: new ObjectId(req.params.id)}, { projection: { nickname: 1 } });
        res.status(201).send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('상점이름을 불러오지 못했습니다');
    }
});

module.exports = router;