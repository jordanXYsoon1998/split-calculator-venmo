const express = require('express');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const userAuth = require('./middleware/userAuth');
const userRouter = require('./routers/user');
const venmoUserRouter = require('./routers/venmoUser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
// Set authentication middleware because user needs to be logged in to our
// platform before they can interact with any Venmo functionality including login
app.use('/venmoUsers', userAuth, venmoUserRouter);
app.get('/', (req, res) => {
  res.send('Welcome to server for SplitBill Venmo API!');
});

module.exports = app;
