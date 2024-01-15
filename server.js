const express = require("express");
const path = require("path");
const app = express();
const { MongoClient } = require('mongodb');
const { db, setDB, getDB } = require('./db');
const { API_URL } = require("./client/src/components/config/contansts");
const productRouter = require('./routes/product');

app.use(express.json());
var cors = require("cors");
app.use(cors());
require("dotenv").config();


const url = process.env.DB_URL;

new MongoClient(url)
  .connect()
  .then((client) => {
    const db = client.db("popol5");
    setDB(db);
    console.log("DB연결성공");
    app.listen(process.env.PORT, function() {
      console.log(`서버주소 : ${API_URL}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  app.use('/', productRouter);

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

app.get("/list", async (요청, 응답) => {
  let list = await db.collection('product').find().toarray()
  console.log(list);
  응답.send('DB에 있던 게시물')
})

app.post("/login", async (req, res) => {
  const db = getDB();
  const { email, password } = req.body;
  console.log(req.body);
  
  const Findemail = await db.collection("user").findOne({
    email: req.body.email
  });
  if(Findemail){
    if(req.body.password === Findemail.password){
      res.status(201).send(Findemail._id);
    } else {
      res.status(400).send("비번 틀림");
    }
  }
  }
);

app.post('/register', async (req,res) => {
  let result = req.body  // sign up 의 데이테를 불러오는 값
  const db = getDB();
  await db.collection("user").insertOne({
    real_name: result.name,
    id: result.id,
    email: result.email,
    password: result.password,
    address: result.address,
    phone_number: result.phone_number,
    role: "user",
    user_name: "user",
    about: " ",
    create_at: new Date()
  })

  res.status(201).send(
    "전송 성공"
    )
  }
);



app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});
