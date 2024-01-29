const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require('mongodb');


router.get('/user', async (req, res) => {
  try {
    const db = getDB();
    const userData = await db.collection("user").find().toArray();
    res.json(userData);
    // console.log("유저 데이터 가져오기:", userData);

  } catch (error) {
    console.error("유저 데이터 가져오기 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }

});

router.post(`/useredit/:id`, async (req, res) => {
  
  console.log('req.params: ', req.params);
  console.log('req.body: ', req.body);
  
  try {
    const db = getDB();
    const { nickname, user, about } = req.body;

    const userData = await db.collection("user").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          nickname,
          user,
          about,
        },
      }
    ); 
    console.log("수정된 사용자 데이터:", userData);
    res.json(userData);

  } catch (error) {
    console.error("데이터 수정 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" }); 
  }
});


module.exports = router;