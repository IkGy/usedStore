const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb'); 

router.get('/room_list', async(req, res) => {
  const db = getDB();
  // console.log("req.query: ", req.query);
  console.log("진입");
  await db.collection('chattingroom').find({
    user: req.query.id
  }).toArray()
  .then((result)=>{
    console.log(result);
    res.status(201).send(result)
  })
  .catch((error)=>{
    console.error(error);
  })
  // console.log("roomList의 result: ", result);
})

// 채팅방에서 닉네임을 가져오기 위한 친구
router.get("/user_nicknames", async (req, res) => {
  const db = getDB();
  let userIds = req.query.userIds;

  // userIds가 문자열 형태의 배열인 경우 파싱하여 배열로 변환
  if (typeof userIds === 'string') {
    userIds = JSON.parse(userIds);
  }

  // console.log('userIds:', userIds);
  // console.log('userIds type:', typeof userIds);

  try {
    // userIds를 배열로 변환
    const userIdsArray = Array.isArray(userIds) ? userIds : [userIds];
    // console.log('userIdsArray:', userIdsArray);

    const users = await db.collection("user").find({ _id: { $in: userIdsArray.map(id => new ObjectId(id)) } }).toArray();
    // console.log('users:', users);

    // 클라이언트에서 전송한 userIds 배열의 순서를 기반으로 정렬
    const sortedUsers = userIdsArray.map(id => users.find(user => user._id.toString() === id));

    const nicknames = sortedUsers.map((user) => user.nickname);
    // console.log('nicknames:', nicknames);
      
    res.status(200).json(nicknames);
  } catch (error) {
    console.error("Failed to fetch user nicknames", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;