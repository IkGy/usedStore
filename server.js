const express = require("express");
const path = require("path");
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const { getDB, setDB } = require('./db');
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
      cb(null, Date.now().toString()); //업로드시 파일명 변경가능
    },
  }),
});

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

app.use(express.json());

var cors = require("cors");
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
      console.log(`서버주소 : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

app.post("/product", upload.single("img"), async (req, res) => {
  const tag = JSON.parse(req.body.tag);
  const category = JSON.parse(req.body.category); 
  const db = getDB();
  console.log(req.body);
  await db.collection("product").insertOne({
    seller: req.body.seller,
    buyer: "",
    category: category,
    title: req.body.title,
    comment: req.body.content,
    product_status: req.body.status,
    refund: req.body.change,
    price: req.body.price,
    loaction: req.body.selectedAddress,
    tags: tag,
    count: req.body.count,
    images: req.file.location,
    status: "판매중",
    created_at: new Date(),
    updated_at: "",
    postprice: req.body.postprice
  })
  res.status(201).send("상품등록성공")
});

app.post("/productuser", async (req, res) => {
  console.log(req.body.cookie);
  if(req.body.cookie){
    const db = getDB();
    console.log("/productuser: ", req.body);
    let result = await db.collection("user").findOne({_id: new ObjectId(req.body.cookie)})
    console.log(result);
    res.status(201).send(result.address)
  } else {
    res.status(404).send("")
  }
  
});


app.get("/mypage", async (요청, 응답) => {
  const db = getDB();
  console.log(요청.query);
  let list = await db.collection('user').findOne({_id:new ObjectId(요청.query.id)});
  console.log('test',list);
  응답.send(list)
})

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});