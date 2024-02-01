const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

router.get("/mypagehoogi", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("review")
    .find({
      resiver: 요청.query.id,
    })
    .toArray();
  응답.send(result);
});

router.get("/mypagehoogi2", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("review")
    .find({
      writer: 요청.query.id,
    })
    .toArray();
  응답.send(result);
});

module.exports = router;