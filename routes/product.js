const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

router.get('/test', async (req, res) => {
    try {
        const db = getDB();
        let list = await db.collection("product").find().toArray();
        console.log("---list---")
        console.log(list);
        res.status(201).send(list);
    } catch(error) {
        console.error(error);
        res.status(500).send('list 조회오류')
    }
});

router.get('/', async (req, res) => {
    try {
        const db = getDB();
        let result = await db.collection("product").find().toArray();
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류');
    }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const db = getDB();
    let result = await db.collection("product").findOne({_id: new ObjectId(req.params.id)});
    let LikeCount = await db.collection("like").find({product_id : req.params.id}).toArray();
    let UserInfo = await db.collection("user").findOne({_id : new ObjectId(result.seller)});
    let Review = await db.collection("review").find({resiver : result.seller}).toArray();
    let products = await db.collection("product").find({seller: (result.seller) }).toArray();
    // console.log("------------ 상품정보 : (product) ------------");
    // console.log(result);
    // console.log("------------ 찜한정보 : (LikeCount) ------------");
    // console.log(LikeCount);
    // console.log("------------ 사용자정보 : (UserInfo) ------------");
    // console.log(UserInfo);
    // console.log("------------ 리뷰정보 : (Review) ------------");
    // console.log(Review);
    // console.log("------------ 판매자의 다른상품목록 : (products) ------------");
    // console.log(products);
    res.status(201).send({
      product: result,
      likes: LikeCount, 
      user: UserInfo,
      review: Review,
      products: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('조회 오류');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    console.log(req.params);
    const db = getDB();
    await db.collection("product").deleteOne({_id: new ObjectId(req.params.id)})
    .then(()=>{
      res.status(201).end();
    })
    .catch(()=>{
      res.status(501).send("삭제 실패")
    })
  }catch(err) {
    console.error(err);
    res.status(500).send('삭제 오류');
  }
})
router.get('/like/check', async (req, res) => {
  try {
    const db = getDB();
    let likerid = await db.collection("like").findOne({
      product_id : req.query.prodid,
      liker : req.query.userid
    });
    console.log(likerid);
    res.status(201).send(likerid)
  } catch (error) {
    console.error(error);
    res.status(500).send('찜 값을 불러오지 못했습니다');
  }
});

router.post('/like/add', async (req, res) => {
  try {
    const db = getDB();
    const { userid, prodid } = req.body;

    // 이미 찜이 되어있는지 확인
    const existingLike = await db.collection("like").findOne({
      product_id: prodid,
      liker: userid
    });

    // 이미 찜한 경우, 중복 추가 방지
    if (existingLike) {
      return res.status(409).send('이미 찜한 상품입니다');
    }

    // 찜 추가
    const newLike = {
      product_id: prodid,
      liker: userid
    };
    await db.collection("like").insertOne(newLike);
    res.status(201).send('찜이 추가되었습니다');
  } catch (error) {
    console.error(error);
    res.status(500).send('찜 추가에 실패했습니다');
  }
});



router.delete('/like/remove', async (req, res) => {
  try {
    const db = getDB();
    const prodid = req.query.prodid;
    const userid = req.query.userid;
    await db.collection("like").deleteOne({
      product_id: prodid,
      liker: userid
    });
    res.status(200).send('찜이 제거되었습니다');
  } catch (error) {
    console.error(error);
    res.status(500).send('찜 제거에 실패했습니다');
  }
});

// router.post('/product/new'.upload.single('image'), (요청, 응답) => {
//         console.log(요청.file)
// })

// router.post('/product/new', upload.single('image'), async (요청, 응답) => {

//     console.log(요청.file)

//     // try {
//     //     if (
//     //         요청.body.title == '',
//     //         요청.body.comment == ''
//     //         ) {
//     //         응답.send('데이터를 모두 넣어주세요')
//     //     } else {
//     //         await db.collection('product').insertOne (
//     //             {
//     //                 title : 요청.body.title,
//     //                 comment : 요청.body.comment
//     //             }
//     //         )
//     //         응답.redirect('/product/new')
//     //     }
//     // } catch(error) {
//     //     console.log(error)
//     //     응답.status(500).send('서버에러')
//     // }
// })





module.exports = router;