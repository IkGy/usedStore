const express = require("express");
const path = require("path");
const app = express();
const { MongoClient } = require('mongodb');
const { setDB } = require('./db');
const { API_URL } = require("./client/src/components/config/contansts");

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

app.use(express.json());

var cors = require("cors");
app.use(cors());

require("dotenv").config();

let db;
const url = process.env.DB_URL;

new MongoClient(url)
  .connect({ useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("popol5");
    setDB(db);
    console.log("DB연결성공");
    app.listen(process.env.PORT, function() {
      console.log(`서버주소 : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/product', productRouter);
app.use('/user', userRouter);

const s3 = new S3Client({
  region : 'ap-northeast-2',
  credentials : {
      accessKeyId : 'AKIAZEIXXJWXC7GFDDLA',
      secretAccessKey : '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'
  }
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'devhunforum1',
    key: function (요청, file, cb) {
      cb(null, Date.now().toString()) //업로드시 파일명 변경가능
    }
  })
})

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



app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});
