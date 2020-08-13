const express = require('express');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const overallRouter = require('./routers/overall');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/split-bill', overallRouter);

module.exports = app;
