
const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');



// 해당 판매자의 고유ID(_id)와 닉네임(nickname) 만 모달창에 보냄
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

// 리뷰 작성자의 정보 가져오기
router.get("/post/shop", async (req, res) => {
  const db = getDB();


  let reviewer = await db.collection('user').findOne({_id:new ObjectId(req.query.id)});
//   console.log(reviewer);
  res.send(reviewer);
})

// 리뷰 작성 모달창의 POST할 데이터
router.post('/post/shop', async (req, res) => {
    try {
        const {resiverId, writerid, content } = req.body;
        const db = getDB();
        
        const currentDate = new Date(); // 현재 날짜 및 시간

        const result = await db.collection('review').insertOne({
            resiver: resiverId,
            writer: writerid,
            create_at: currentDate,
            update_at: currentDate,
            comment: content,
            write_id: req.body.writer,
            profileIMG: req.body.profileIMG
        });
        res.status(201).send({ message: '후기가 성공적으로 작성되었습니다.' });
    } catch (error) {
        console.error('후기 작성 에러:', error);
        res.status(500).send({ message: '후기 작성 중 오류가 발생했습니다.' });
    }
});


module.exports = router;