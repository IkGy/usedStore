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
        console.log('result:', result);
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
        console.log("------------ 상품정보 : (product) ------------");
        console.log(result);
        console.log("------------ 찜한정보 : (LikeCount) ------------");
        console.log(LikeCount);
        console.log("------------ 사용자정보 : (UserInfo) ------------");
        console.log(UserInfo);
        console.log("------------ 리뷰정보 : (Review) ------------");
        console.log(Review);
        console.log("------------ 판매자의 다른상품목록 : (products) ------------");
        console.log(products);
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