const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require('mongodb');


router.get('/user', async (req, res) => {
  try {
    const db = getDB();
    const userData = await db.collection("user").find().toArray();
    // console.log("user 사용자 데이터:", userData);
    res.json(userData);

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
    const userData = await db.collection("user").updateOne(
      { _id: new ObjectId(req.params) },
      {
        $set: {
          nickname: req.body.nickname,
          user: req.body.user,
          about: req.body.about,
        },
      }
    ); 
    console.log("(useredit) 사용자 데이터:", userData);
    res.json(userData);

  } catch (error) {
    console.error("(useredit) 데이터 수정 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" }); 
  }

});

// router.get('/prodAll', async(req,res)=>{
//   await 
// })

module.exports = router;