const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

router.post("/login", async (req, res) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    const user = await db.collection("user").findOne({ email: email });
    if (user && password === user.password) {
      res.status(201).send(user._id);
    } else {
      res.status(400).send("이메일 또는 비밀번호가 잘못되었습니다");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

router.post("/register", async (req, res) => {
  try {
    const db = getDB();
    let { name, id, nickname, email, password, address, phone_number } = req.body;

    // email과 nickname 중복 확인
    const existingEmailUser = await db.collection("user").findOne({ email: email });
    const existingNicknameUser = await db.collection("user").findOne({ nickname: nickname });

    if (existingEmailUser) {
      return res.status(400).send("이미 사용 중인 이메일입니다");
    }
    if (existingNicknameUser) {
      return res.status(400).send("이미 사용 중인 닉네임입니다");
    }

    await db.collection("user").insertOne({
      real_name: name,
      id: id,
      nickname: nickname,
      email: email,
      password: password,
      address: address,
      phone_number: phone_number,
      role: "user",
      about: " ",
      create_at: new Date(),
      profileIMG: " ",
    });

    res.status(201).send("회원가입 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

router.post("/edit", async (req, res) => {
  const db = getDB();
  await db.collection('user').updateOne({_id: new ObjectId(req.body.id)},{
    $set:{
      nickname:req.body.nickname,
      about:req.body.about,
      address:req.body.address,
      profileIMG:req.body.profileIMG
    }})
  .then(()=>{
    res.status(201).end();
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).end();
  })
})

router.post("/findpw", async (req, res) => {
  try {
    const db = getDB();
    const { email, real_name } = req.body;
    const user = await db.collection("user").findOne({ email: email, real_name: real_name });

    if (!user) {
      return res.status(400).send("이메일 또는 이름이 일치하지 않습니다.");
    }

    const newPassword = MakeRandomPW();

    await db.collection("user").updateOne({ email: email }, { $set: { password: newPassword  } })
    
    res.status(200).send({ newPassword });
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

function MakeRandomPW() {
  const length = 12; // 원하는 비밀번호 길이
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newPassword = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters.charAt(randomIndex);
  } // 무작위 비밀번호 생성

  return newPassword;
}

router.post("/makenewpw", async (req, res) => {
  try {
    const db = getDB();
    const { currentPW, newPW, id } = req.body;
    const user = await db.collection("user").findOne({ _id: new ObjectId(id) });

    if (!user) {
      res.status(400).send("사용자를 찾을 수 없습니다.");
      return;
    }

    if (newPW !== req.body.newPW) {
      res.status(400).send("새로운 비밀번호와 확인된 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (user.password === currentPW) {
      await db.collection("user").updateOne({ _id: new ObjectId(id) }, { $set: { password: newPW } });
      res.status(200).send("비밀번호가 성공적으로 변경되었습니다.");
    } else {
      res.status(400).send("현재 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
});

router.get("/mypage", async (요청, 응답) => {
  const db = getDB();
  // console.log(요청.query);
  let list = await db.collection('user').findOne({_id:new ObjectId(요청.query.id)});
  // console.log('test',list);
  응답.send(list);
})

router.get("/mypageview/:id", async (req, res) => {
  try {
    const db = getDB();
    let getreview = await db.collection("review").find({ resiver: req.params.id }).toArray();
    // console.log("----리뷰정보----");
    // console.log(getreview);
    // console.log("----------------");
    res.status(201).send({
      review: getreview
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('리뷰를 불러오지 못했습니다');
  }
});

module.exports = router;