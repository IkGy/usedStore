const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

router.get("/singo/:product_id/:user_id", async (req, res) => {
  const db = getDB();
  let userinfo = await db
    .collection("user")
    .findOne({ _id: new ObjectId(req.params.user_id) });

  let 중복 = await db.collection("report_list").findOne({
    reported_product_id: req.params.product_id,
    reporter_nickname: userinfo.nickname,
  });

  if (중복) {
    res.status(201).send("이미신고함");
  } else {
    let productinfo = await db
      .collection("product")
      .findOne({ _id: new ObjectId(req.params.product_id) });

    let seller = await db
      .collection("user")
      .findOne({ _id: new ObjectId(productinfo.seller) });
    console.log(seller.nickname);

    res.status(201).send({ productinfo, userinfo, seller });
  }
});

router.post("/singo", async (req, res) => {
  const db = getDB();
  await db.collection("report_list").insertOne({
    report_type: req.body.report_type,
    reported_post: req.body.reported_post,
    report_content: req.body.report_content,
    report_date: req.body.report_date,
    reported_link: req.body.reported_link,
    reported_user_nickname: req.body.reported_user_nickname,
    reported_user_email: req.body.reported_user_email,
    reporter_nickname: req.body.reporter_nickname,
    reporter_email: req.body.reporter_email,
    reported_product_id: req.body.reported_product_id,
  });
  res.status(201).send("접수완료");
});
module.exports = router;