const express = require("express");
const path = require("path");
const app = express();
const { MongoClient } = require('mongodb');
const { setDB } = require('./db');

const productRouter = require('./routes/product');

app.use(express.json());
var cors = require("cors");
app.use(cors());
require("dotenv").config();

let db;
const url = process.env.DB_URL;

new MongoClient(url)
  .connect()
  .then((client) => {
    const db = client.db("popol5");
    setDB(db);
    console.log("DB연결성공");
    app.listen(process.env.PORT, function () {
      console.log("listening on 8080");
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

app.post('/register', async (req,res) => {
  console.log('req: ', req);
  console.log('res: ', res);
  let result = req.body  // sign up 의 데이테를 불러오는 값
  console.log('result: ', result);
  
}) 



app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/client/build/index.html"));
});
