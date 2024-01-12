const express = require('express');
const router = express.Router();

const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

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
        let result = await db.collection("product").findOne({_id:new ObjectId(req.params.id)});
        let LikeCount = await db.collection("like").find({"product_id" : req.params.id}).toArray();
        console.log("-------------LikeCount------------");
        console.log(LikeCount);
        console.log("-------------result------------");
        console.log(result);
        res.status(201).send({ product: result, likes: LikeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('조회 오류')
    }
});

// router.get('detail/:id', async (req, res) => {

//     const ItemId = req.body.id

//     try {
//         const db = getDB();
//         let result = await db.collection("like").find(product_id=ItemId).toArray();
//         console.log(req.body.id);
//         res.status(201).send(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('조회 오류')
//     }
// })

// /detail/:id > product > _id 

// router.get('/:id', async (req, res) => {
//     try {
//         const db = await connectDB();
//         const productId = req.params.id;
//         const product = await db.collection('product').findOne({ _id: productId });

//         if (!product) {
//             return res.status(404).send('상품을 찾을 수 없습니다.');
//         }
        
//         res.json(product);
//     } catch (error) {
//         res.status(500).send('서버 오류')
//     }
// });

module.exports = router;