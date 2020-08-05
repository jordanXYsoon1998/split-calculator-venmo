const express = require('express');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to server for SplitBill Venmo API!');
});

module.exports = app;
