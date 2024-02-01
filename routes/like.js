const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

// 찜해둔 물품목록
router.get("/picklist", async (요청, 응답) => {
  const db = getDB();
  const prodData = [];
  let result = await db
    .collection("like")
    .find({ liker: 요청.query.id })
    .toArray();

  for (let i = 0; i < result.length; i++) {
    await db
      .collection("product")
      .findOne({ _id: new ObjectId(result[i].product_id) })
      .then((res) => {
        prodData.push(res);
      })
      .catch((err) => {
        console.log(err);
        res.static(501).end();
      });
  }
  응답.send(prodData);
});

router.delete("/likedel/:user/:product_id", async (req, res) => {
  const db = getDB();
  console.log(req.params);
  await db
    .collection("like")
    .deleteOne({ product_id: req.params.product_id, liker: req.params.user });
  res.status(201).send("짬해제성공");
});

module.exports = router;