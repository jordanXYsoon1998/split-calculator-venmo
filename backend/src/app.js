const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');

const app = express();

app.use(express.json());
app.use(userRouter);
app.get('/', (req, res) => {
  res.send('Welcome to server for SplitBill Venmo API!');
});

module.exports = app;
