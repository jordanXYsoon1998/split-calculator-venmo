const express = require('express');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const overallRouter = require('./routers/overall');

const app = express();

app.use(express.json());
app.use(cookieParser());
// Simulate server delay
app.use(function(req, res, next) {setTimeout(next, 1000)});
app.use('/api/split-bill', overallRouter);

module.exports = app;
