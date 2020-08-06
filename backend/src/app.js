const express = require('express');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const userRouter = require('./routers/user');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.get('/', (req, res) => {
  res.send('Welcome to server for SplitBill Venmo API!');
});

module.exports = app;
