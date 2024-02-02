const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    let result = await db.collection("product").find().toArray();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

router.get("/header", async (req, res) => {
  const db = getDB();
  let result = await db
    .collection("product")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.status(201).send({ product: result });
});

router.get('/detail/:id', async (req, res) => {
  try {
    const db = getDB();
    let result = await db
      .collection("product")
      .findOne({ _id: new ObjectId(req.params.id) });
    let LikeCount = await db
      .collection("like")
      .find({ product_id: req.params.id })
      .toArray();
    let UserInfo = await db
      .collection("user")
      .findOne({ _id: new ObjectId(result.seller) });
    let Review = await db
      .collection("review")
      .find({ resiver: result.seller })
      .toArray();
    let products = await db
      .collection("product")
      .find({ seller: result.seller })
      .toArray();
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
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("조회 오류");
  }
});

router.delete("/delete/:id/:proid", async (req, res) => {
  try {
    // console.log(req.params);
    const db = getDB();
    await db
      .collection("product")
      .deleteOne({ _id: new ObjectId(req.params.proid) })
      .then(() => {
        res.status(201).end();
      })
      .catch(() => {
        res.status(501).send("삭제 실패");
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("삭제 오류");
  }
});

router.get("/like/check", async (req, res) => {
  try {
    const db = getDB();
    let likerid = await db.collection("like").findOne({
      product_id: req.query.prodid,
      liker: req.query.userid,
    });
    // console.log(likerid);
    res.status(201).send(likerid)
  } catch (error) {
    console.error(error);
    res.status(500).send("찜 값을 불러오지 못했습니다");
  }
});

router.post("/like/add", async (req, res) => {
  try {
    const db = getDB();
    const { userid, prodid } = req.body;

    // 이미 찜이 되어있는지 확인
    const existingLike = await db.collection("like").findOne({
      product_id: prodid,
      liker: userid,
    });

    // 이미 찜한 경우, 중복 추가 방지
    if (existingLike) {
      return res.status(409).send("이미 찜한 상품입니다");
    }

    // 찜 추가
    const newLike = {
      product_id: prodid,
      liker: userid,
    };
    await db.collection("like").insertOne(newLike);
    res.status(201).send("찜이 추가되었습니다");
  } catch (error) {
    console.error(error);
    res.status(500).send("찜 추가에 실패했습니다");
  }
});

router.delete("/like/remove", async (req, res) => {
  try {
    const db = getDB();
    const prodid = req.query.prodid;
    const userid = req.query.userid;
    await db.collection("like").deleteOne({
      product_id: prodid,
      liker: userid,
    });
    res.status(200).send("찜이 제거되었습니다");
  } catch (error) {
    console.error(error);
    res.status(500).send("찜 제거에 실패했습니다");
  }
});

router.get("/like/getlike", async (req, res) => {
  try {
    const db = getDB();
    const prodid = req.query.prodid;
    await db
      .collection("like")
      .find({
        product_id: prodid,
      })
      .toArray()
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("조회 오류");
  }
});

router.post("/open/chattingroom/:id", async (req, res) => {
  try {
    const db = getDB();
    // console.log(req.query);
    const mychattingroom = req.query;
    await db
      .collection("chattingroom")
      .find({
        chattingroom_id: mychattingroom,
      })
      .toArray();
  } catch (error) {
    console.error(error);
    res.status(500).send("채팅방을 조회하지 못했습니다");
  }
});


router.post('/open/chattingroom/:id', async (req, res) => {
  try {
    const db = getDB();
    // console.log(req.query);
    const mychattingroom = req.query;
    await db.collection("chattingroom").find({
      chattingroom_id: mychattingroom
    }).toArray();
  } catch (error) {
    console.error(error);
    res.status(500).send('채팅방을 조회하지 못했습니다');
  }
});


router.get("/search/:search", async (req, res) => {
  const db = getDB();
  let 검색조건 = [
    {
      $search: {
        index: "title_index",
        text: { query: req.params.search, path: ["title", "tags"] },
      },
    },
  ];
  let result = await db.collection("product").aggregate(검색조건).toArray();
  res.status(201).send(result);
});

router.get("/detailsearch/:category", async (req, res) => {
  const db = getDB();
  let 검색조건 = [
    {
      $search: {
        index: "category_index",
        text: { query: req.params.category, path: "category" },
      },
    },
  ];
  let result = await db.collection("product").aggregate(검색조건).toArray();
  res.status(201).send(result);
});

router.get("/product/registered", async (요청, 응답) => {
  const db = getDB();
  
  await db
    .collection("product")
    .find({
      seller: 요청.query.id
    })
    .toArray()
    .then((result)=>{
      응답.send(result);
    })
    .catch((error)=>{
      console.error(error);
    })
});

router.post("/sellitemedit", async (req, res) => {
  const db = getDB();
  console.log("edit: ", req.body);
  let product = await db.collection("product").findOne({
    _id: new ObjectId(req.body._id),
  });
  console.log("product: ", product);
  res.status(201).send(product);
});

router.post("/productedit", async (req, res) => {
  const db = getDB();
  const tag = JSON.parse(req.body.tag);
  const category = JSON.parse(req.body.category);
  await db.collection("product").updateOne(
    { _id: new ObjectId(req.body._id) },
    {
      $set: {
        price: req.body.price,
        count: req.body.count,
        tags: tag,
        title: req.body.title,
        category: category,
        comment: req.body.content,
        product_status: req.body.status,
        refund: req.body.change,
        location: req.body.selectedAddress,
        postprice: req.body.postprice,
        updated_at: new Date(),
      },
    }
  );
  res.status(201).send("수정완료");
});

router.post("/sellcomplete/:_id", async (req, res) => {
  const db = getDB();
  await db.collection("product").updateOne(
    { _id: new ObjectId(req.params._id) },
    {
      $set: {
        status: "판매완료",
      },
    }
  ).then(()=>{
    console.log("수정완료");
    res.status(201).send("판매완료!");
  }).catch((err)=>{
    console.log(err);
    res.status(501).send("수정실패");
  })
});

module.exports = router;