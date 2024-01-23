const express = require("express");
const path = require("path");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");
const { getDB, setDB } = require("./db");
const { API_URL } = require("./client/src/components/config/contansts");
require("dotenv").config();

// ---------실시간채팅------------- //
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)


const {} = require('./routes/user')
const {} = require('./routes/room_list')
const {} = require('./routes/chat_room')


const roomRouter = require('./routes/chat_room')
const room_listRouter = require('./routes/room_list')
// ------------------------------- //

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


app.use(express.json());

var cors = require("cors");
const { log } = require('console');
app.use(cors());
let db;
const url = process.env.DB_URL;

new MongoClient(url)
  .connect({ useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("popol5");
    setDB(db);
    console.log("DB연결성공");
    app.listen(process.env.PORT, function () {
      console.log(`연결포트 : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/naver', naverRouter);
app.use('/jwt', jwtRouter);
app.use("/prod", productRouter);
app.use("/user", userRouter);

// app.post('/product/new', upload.single('image'), (요청, 응답) => {
//   console.log(요청.file)
// })

app.use(express.static(path.join(__dirname, "client/build")));

// app.get('/', async (req,res) => {
//   let result = await db.collection("product").find().toArray()
//   console.log(result);
//   res.status(201).send(result)
// })

// app.get('/header', async (req,res) => {
//   let result = await db.collection("product").find().toArray()
//   console.log(result);
//   res.status(201).send(result)
// })

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   const Findemail = await db.collection("user").findOne({
//     email: req.body.email
//   });
//   if(Findemail){
//     if(req.body.password === Findemail.password){
//       res.status(201).send("성공");
//     } else {
//       res.status(400).send("비번 틀림");
//     }
//   }
//   }
// );

// app.post('/register', async (req,res) => {
//   let result = req.body  // sign up 의 데이테를 불러오는 값
//   await db.collection("user").insertOne({
//     real_name: result.name,
//     id: result.id,
//     email: result.email,
//     password: result.password,
//     address: result.address,
//     phone_number: result.phone_number,
//     role: "user",
//     user_name: "user",
//     about: " ",
//     create_at: new Date()
//   })

//   res.status(201).send(
//     "전송 성공"
//     )
//   }
// );

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
    {$search : {
      index: 'title_index',
      text : {query: req.params.search, path: ['title', 'tags']}
    }}
  ]
  let result = await db.collection('product').aggregate(검색조건).toArray()
  res.status(201).send(result)
});

app.get("/detailsearch/:category", async (req, res) => {
  const db = getDB();
  let 검색조건 = [
    {$search : {
      index: 'category_index',
      text : {query: req.params.category, path: 'category'}
    }}
  ]
  let result = await db.collection('product').aggregate(검색조건).toArray()
  res.status(201).send(result)
});

app.get("/address/:cookie", async (req, res) => {
  const db = getDB();
  
  let result = await db.collection("user").findOne({
    _id: new ObjectId(req.params.cookie)
  })
  console.log(result);
  res.status(201).send(result.address)
});



app.get("/mypage", async (요청, 응답) => {
  const db = getDB();
  console.log(요청.query);
  let list = await db
    .collection("user")
    .findOne({ _id: new ObjectId(요청.query.id) });
  console.log("test", list);
  응답.send(list);
});

app.get("/product/registered", async (요청, 응답) => {
  const db = getDB();
  console.log(요청.query);
  let result = await db.collection("product").find({
    seller: 요청.query.id,
    status: "판매중"
  }).toArray();
  console.log(result);
  응답.send(result);

})

app.get("/product/buylist", async (요청, 응답) => {
  const db = getDB();
  console.log(요청.query);
  let result = await db.collection("product").find({
    buyer: 요청.query.id,
    status: "판매완료"
  }).toArray();
  console.log(result);
  응답.send(result);

})

app.get("/product/soldlist", async (요청, 응답) => {
  const db = getDB();
  console.log(요청.query);
  let result = await db.collection("product").find({
    seller: 요청.query.id,
    status: "판매완료"
  }).toArray();
  console.log(result);
  응답.send(result);

})

app.get("/like/picklist", async (요청, 응답) => {
  const db = getDB();
  const prodData = [];
  console.log(요청.query);
  let result = await db.collection("like").find({liker: 요청.query.id,}).toArray();
  console.log('like',result);

  for (let i = 0; i < result.length; i++) { 
    await db.collection('product').findOne({_id:new ObjectId(result[i].product_id)})
    .then((res)=>{
      console.log('res',res);
      prodData.push(res);
    })
    .catch((err)=>{
      console.log(err);
      res.static(501).end();
    })
  }
  console.log("prodData:",prodData);
  응답.send(prodData);
})

app.get('/room_list', async(req, res) => {
  const db = getDB();
  let result = await db.collection('chattingroom').find({
    user: req.query.id
  }).toArray()
  res.status(201).send(result)
})

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// ---------실시간채팅------------- //


io.on('connection', (socket) => {
  console.log('새로운 유저가 접속했습니다.')

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    console.log('user: ', user)
    console.log(typeof message, message)

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name}님이 퇴장하셨습니다.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
    console.log('유저가 나갔습니다.') 
  })
})

// ------------------------------- //
