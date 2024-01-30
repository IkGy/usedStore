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
    console.log("(useredit) 사용자 데이터:", userData);
    res.json(userData);

  } catch (error) {
    console.error("데이터 수정 실패:", error);
    res.status(500).json({ error: "서버 오류 발생" }); 
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