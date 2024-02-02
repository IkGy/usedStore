const express = require("express");
const path = require("path");
const app = express();

const naverRouter = require("./routes/naverlogin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const jwtRouter = require("./routes/jwtRouter");
const chatRouter = require("./routes/chat_room");
const roomRouter = require("./routes/room_list");
const mypageRouter = require("./routes/mypage");
const adminRouter = require("./routes/admin"); // 관리자 페이지용 라우터입니다.
const reviewRouter = require("./routes/review"); 
const likeRouter = require("./routes/like"); 
const reportRouter = require("./routes/report_list"); 

const { MongoClient, ObjectId } = require("mongodb");
const { getDB, setDB } = require("./db");
const { API_URL } = require("./client/src/components/config/contansts");
require("dotenv").config();


const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const url = process.env.DB_URL;

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

app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({extended:false}));  

const cors = require("cors");

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));


app.use("/naver", naverRouter);
app.use("/jwt", jwtRouter);
app.use("/prod", productRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/chat_room", roomRouter);
app.use("/mypage", mypageRouter);
app.use("/admin", adminRouter);
app.use("/review", reviewRouter);
app.use("/like", likeRouter);
app.use("/report", reportRouter);

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("*", function (요청, 응답) {
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

app.post("/upload", upload.single("profileIMG"), (req, res) => {
  const file = req.file;
  // 업로드된 파일의 경로를 클라이언트에게 전송
  const fileUrl = `https://popol5.s3.ap-northeast-2.amazonaws.com/${file.filename}`;
  res.json({ fileUrl });
});

app.post("/edit", upload.single("profileIMG"), async (req, res) => {
  const db = getDB();
  let nicknamecheck = await db.collection("user").findOne({
    nickname: req.body.nickname,
  });

  if (nicknamecheck && nicknamecheck._id.toString() !== req.body._id) {
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
// ---------실시간채팅------------- //

app.use(cors({ origin: '*' }))
const io = new Server(server, {cors: {origin: '*'}});

const roomInfo = [];
// Socket.io 설정
io.on('connection', (socket) => {
  const { url } = socket.request;
  console.log(`${url} 에서 연결됨`);
  
  // 방 입장 이벤트 핸들링
  socket.on('join', (room, callback) => {
    console.log('방 입장:', room);

    // 해당 방에 클라이언트 소켓을 조인
    socket.join(room);
    roomInfo[socket.id] = room;
    console.log(roomInfo[socket.id]);
  });

  // 클라이언트로부터의 메시지 이벤트 핸들링
  socket.on('sendMessage', async (data) => {
    const { writer, message } = data;
    console.log("data: ", data);
    console.log("writer: ", writer);
    console.log('메시지 받음:', message);
    const room = roomInfo[socket.id];
    console.log("room: ", room);

    // 같은 방에 있는 모든 클라이언트에게 메시지 전송
    io.to(room).emit('message', { writer, message });
  });

  // 연결 해제 이벤트 핸들링
  socket.on('disconnect', () => {
    console.log('사용자가 연결 해제됨');

  });
});

server.listen(5000, () => console.log("채팅서버 연결"));



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