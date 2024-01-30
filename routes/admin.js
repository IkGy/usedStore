const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require('mongodb');

// 유저 데이터 불러오기
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

//유저 데이터 삭제
router.delete('/user/:id', async (req, res) => {
  try {
    const db = getDB();
    const deletedUser = await db.collection('user').deleteOne({ _id: new ObjectId(req.params.id) });
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: '삭제할 사용자를 찾을 수 없습니다.' });
    }
    res.status(200).json({ message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    console.error("데이터 삭제 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

// 유저 데이터 수정하기
router.post(`/useredit/:id`, async (req, res) => {
  // console.log('req.params: ', req.params);
  // console.log('req.body: ', req.body);
  try {
    const db = getDB();
    const userData = await db.collection('user').findOne({ _id: new ObjectId(req.params.id) })
    const editNickname = req.body.nickname || userData.nickname;
    const editRole = req.body.role || userData.role;
    const editAbout = req.body.about || userData.about;
    await db.collection("user").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          nickname: editNickname,
          role: editRole,
          about: editAbout,
        },
      }
    );
    res.status(201);

  } catch (error) {
    console.error("데이터 수정 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" }); 
  }
});

// 신고 관리
router.get("/report", async (req, res) => {
  try {
    const db = getDB();
    let result = await db.collection("report_list").find().toArray();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("신고 데이터를 찾을 수 없습니다");
  }
});

router.get('/prodAll', async (req, res) => {
  const db = getDB();
  try {
    const products = await db.collection('product').aggregate([
      {
        $lookup: {
          from: 'user',
          let: { sellerId: { $toObjectId: '$seller' } }, // Convert seller to ObjectId
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$sellerId'] }
              }
            },
            {
              $project: {
                password: 0, // Exclude password from sellerInfo
                // Add other fields as needed
              }
            }
          ],
          as: 'sellerInfo'
        }
      },
      {
        $lookup: {
          from: 'user',
          let: { buyerId: { $cond: { if: { $ne: ['$buyer', ''] }, then: { $toObjectId: '$buyer' }, else: null } } }, // Convert buyer to ObjectId if not empty
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$buyerId'] }
              }
            },
            {
              $project: {
                password: 0, // Exclude password from buyerInfo
              }
            }
          ],
          as: 'buyerInfo'
        }
      },
      {
        $unwind: {
          path: '$sellerInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$buyerInfo',
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/prodOne', async (req, res) => {  
  try {
    console.log(req.query);
    const db = getDB();
    await db.collection("product").deleteOne(
      { _id : new ObjectId(req.query.prod_id) }
    )
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류 발생" });
  }

});

module.exports = router;