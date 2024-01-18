const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
  const {token} = req.body;
  console.log("token: ", token);
  const decodeToken = jwt.decode(token);
  res.status(200).json(decodeToken);
});

module.exports = router;