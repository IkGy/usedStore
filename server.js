const express = require("express");
const path = require("path");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const { getDB, setDB } = require("./db");
const { API_URL } = require("./client/src/components/config/contansts");
require("dotenv").config();

const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "popol5",
    key: function (요청, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now().toString() + ext);
    },
  }),
});

const naverRouter = require("./routes/naverlogin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const jwtRouter = require("./routes/jwtRouter");
const roomRouter = require("./routes/chat_room");
const mypageRouter = require("./routes/mypage");
const adminRouter = require("./routes/admin"); // 관리자 페이지용 라우터입니다.

app.use(express.json());

const cors = require("cors");
const { log } = require("console");
const { write } = require("fs");
const { equal } = require("assert");
app.use(cors());

const url = process.env.DB_URL;
const port = process.env.PORT;

new MongoClient(url)
  .connect({ useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("popol5");
    setDB(db);
    console.log("DB 연결성공");
    app.listen(process.env.PORT, function () {
      console.log(`연결포트 : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/naver", naverRouter);
app.use("/jwt", jwtRouter);
app.use("/prod", productRouter);
app.use("/user", userRouter);
app.use("/chat", roomRouter);
app.use("/mypage", mypageRouter);
app.use("/admin", adminRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.post("/product", upload.array("img", 3), async (req, res) => {
  const tag = JSON.parse(req.body.tag);
  const category = JSON.parse(req.body.category);
  const db = getDB();

  console.log(req.body);
  console.log("img", req.files);

  const images = req.files.map((file) => file.location);
  await db.collection("product").insertOne({
    seller: req.body.seller,
    buyer: "",
    category: category,
    title: req.body.title,
    comment: req.body.content,
    product_status: req.body.status,
    refund: req.body.change,
    price: req.body.price,
    location: req.body.selectedAddress,
    tags: tag,
    count: req.body.count,
    images: images,
    status: "판매중",
    created_at: new Date(),
    updated_at: "",
    postprice: req.body.postprice,
  });
  res.status(201).send("상품등록성공");
});

app.post("/productuser", async (req, res) => {
  if (req.body.cookie) {
    const db = getDB();
    let result = await db
      .collection("user")
      .findOne({ _id: new ObjectId(req.body.cookie) });
    res.status(201).send(result.address);
  } else {
    res.status(404).send("");
  }
});

app.get("/search/:search", async (req, res) => {
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

app.get("/detailsearch/:category", async (req, res) => {
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

app.get("/address/:cookie", async (req, res) => {
  const db = getDB();

  let result = await db.collection("user").findOne({
    _id: new ObjectId(req.params.cookie),
  });
  res.status(201).send(result.address);
});

app.post("/upload", upload.single("profileIMG"), (req, res) => {
  const file = req.file;

  // 업로드된 파일의 경로를 클라이언트에게 전송
  const fileUrl = `https://popol5.s3.ap-northeast-2.amazonaws.com/${file.filename}`;
  res.json({ fileUrl });
});

// 등록된 상품을 받아옴
app.get("/product/registered", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("product")
    .find({
      seller: 요청.query.id,
    })
    .toArray();
  응답.send(result);
});

// 구매한 상품의 목록을 받아옴
app.get("/product/buylist", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("product")
    .find({
      buyer: 요청.query.id,
      status: "판매완료",
    })
    .toArray();
  console.log(result);
  응답.send(result);
});

// 자신이 판매했던 목록을 나열
app.get("/product/soldlist", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("product")
    .find({
      seller: 요청.query.id,
      status: "판매완료",
    })
    .toArray();
  응답.send(result);
});

app.get("/review/mypagehoogi", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("review")
    .find({
      resiver: 요청.query.id,
    })
    .toArray();
  응답.send(result);
});

app.get("/review/mypagehoogi2", async (요청, 응답) => {
  const db = getDB();
  let result = await db
    .collection("review")
    .find({
      writer: 요청.query.id,
    })
    .toArray();
  응답.send(result);
});

// 찜해둔 물품목록
app.get("/like/picklist", async (요청, 응답) => {
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



app.post("/sellitemedit", async (req, res) => {
  const db = getDB();
  console.log("edit: ", req.body);
  let product = await db.collection("product").findOne({
    _id: new ObjectId(req.body._id),
  });
  console.log("product: ", product);
  res.status(201).send(product);
});

app.post("/productedit", async (req, res) => {
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

app.post("/user/edit", upload.single("profileIMG"), async (req, res) => {
  const db = getDB();
  let nicknamecheck = await db.collection("user").findOne({
    nickname: req.body.nickname,
  });

  if (req.body.nickname.length < 2 || req.body.nickname.length > 10) {
    return res.status(400).send("닉네임은 2글자에서 10글자 사이어야 합니다");
  } else if (nicknamecheck && nicknamecheck._id.toString() !== req.body._id) {
    res.status(201).send("닉네임중복");
  } else {
    if (req.file) {
      await db.collection("user").updateOne(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            nickname: req.body.nickname,
            about: req.body.about,
            address: req.body.address,
            profileIMG: req.file.location,
          },
        }
      );
      await db.collection("review").updateMany(
        { write_id: req.body._id },
        {
          $set: {
            writer: req.body.nickname,
            profileIMG: req.file.location,
          },
        }
      );
      await db.collection("report_list").updateMany(
        {
          reporter_nickname: req.body.oldnickname,
        },
        {
          $set: {
            reporter_nickname: req.body.nickname,
          },
        }
      );
    } else {
      await db.collection("user").updateOne(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            nickname: req.body.nickname,
            about: req.body.about,
            address: req.body.address,
          },
        }
      );
      await db.collection("review").updateMany(
        { write_id: req.body._id },
        {
          $set: {
            writer: req.body.nickname,
          },
        }
      );
      await db.collection("report_list").updateMany(
        {
          reporter_nickname: req.body.oldnickname,
        },
        {
          $set: {
            reporter_nickname: req.body.nickname,
          },
        }
      );
    }
    let result = await db
      .collection("user")
      .findOne({ _id: new ObjectId(req.body._id) });
    res.status(201).send(result);
  }
});

app.delete("/likedel/:user/:product_id", async (req, res) => {
  const db = getDB();
  console.log(req.params);
  await db
    .collection("like")
    .deleteOne({ product_id: req.params.product_id, liker: req.params.user });
  res.status(201).send("짬해제성공");
});

app.get("/singo/:product_id/:user_id", async (req, res) => {
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

app.post("/singo", async (req, res) => {
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

app.post("/sellcomplete/:_id", async (req, res) => {
  const db = getDB();
  await db.collection("product").updateOne(
    { _id: new ObjectId(req.params._id) },
    {
      $set: {
        status: "판매완료",
      },
    }
  );

  res.status(201).send("판매완료!");
});

// ---------실시간채팅------------- //

// Socket.io 설정
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
// const socketio = require('socket.io');
// const io = socketio(server)

// app.use(cors());
app.use(cors({ origin: '*' }))
const io = new Server(server, {cors: {origin: '*'}});

const roomInfo = [];
console.log("소켓으로 들어오긴 함");
io.on('connection', (socket) => {
  const { url } = socket.request;
  console.log(`${url} 에서 연결됨`);
  
  // 방 입장 이벤트 핸들링
  socket.on('join', (room, callback) => {
    console.log('방 입장:', room);
    // 해당 방에 클라이언트 소켓을 조인
    roomInfo[socket.id] = room;
    console.log(roomInfo[socket.id]);
    socket.join(room);
    console.log("join 실행");
    // callback()
  });

  // 클라이언트로부터의 메시지 이벤트 핸들링
  socket.on('sendMessage', async (data, callback) => {
    console.log("소켓 sendMessage 진입");
    const { writer, message, images } = data;
    console.log("data: ", data);
    console.log("writer: ", writer);
    console.log('메시지 받음:', message);
    console.log('이미지 받음:', images);
    const room = roomInfo[socket.id];
    console.log("room: ", room);

    // 같은 방에 있는 모든 클라이언트에게 메시지 전송
    io.to(room).emit('message', { writer, message, images });
    // callback()
  });

  // 연결 해제 이벤트 핸들링
  socket.on('disconnect', () => {
    console.log('사용자가 연결 해제됨');

  });
});

server.listen(5000, () => console.log("채팅서버 연결"));


app.get("/chat", (req, res) => res.sendFile(`${__dirname}/chat_room.js`));

// 채팅 조회를 위한 친구들-----------------



app.get("/room_list", async (req, res) => {
  const db = getDB();

  let result = await db
    .collection("chattingroom")
    .find({
      user: req.query.id,
    })
    .toArray();

  // console.log("roomList의 result: ", result);
  res.status(201).send(result);
});

app.get("/chat_room", async (req, res) => {
  const db = getDB();
  const user_ID = req.query.id;

  // let test = await db.collection('chattingroom').aggregate([
  //   {
  //     $lookup: {
  //       from: 'user',
  //       let: {
          
  //       }
  //     }
  //   }
  // ])

  try {
    let result = await db.collection('chattingroom').find({
      user: user_ID
    }).toArray();

    console.log("result: ", result);
    res.status(201).send(result);
  } catch (error) {
    console.log("채팅 불러오기 실패다 이자식아");
    res.status(500).send("대체 어떻게 조회한거야?!");
  }
});

app.get("/chat_log", async (req, res) => {
  // console.log("로그에서 req.query: ", req.query);
  const db = getDB();
  try {
    await db
      .collection("chatting")
      .find({ room_id: req.query.room_id })
      .toArray()
      .then((result) => {
        // console.log("result: ", result);
        return res.status(201).send(result);
      });
  } catch (error) {
    console.log("채팅 불러오기 실패다 이자식아");
    res.status(500).send("대체 어떻게 조회한거야?!");
  }
});
// 채팅방에서 닉네임을 가져오기 위한 친구
app.get("/user_nicknames", async (req, res) => {
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





// ---------------------------------

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});
