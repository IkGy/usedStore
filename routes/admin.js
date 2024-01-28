const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.get('/user', async (req, res) => {
  try {
    const db = getDB();
    const userDataCursor = await db.collection("user").find();
    const userData = await userDataCursor.toArray(); // 커서를 배열로 변환
    console.log("사용자 데이터:", userData);
    res.json(userData);
  } catch (error) {
    console.error("유저 데이터 가져오기 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
