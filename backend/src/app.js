const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./db/mongoose');
const overallRouter = require('./routers/overall');

const app = express();

app.use(express.json());
app.use(cookieParser());

const buildPath = path.join(__dirname, '..', '..', 'frontend', 'build');
app.use(express.static(buildPath));
// Simulate server delay
// app.use(function(req, res, next) {setTimeout(next, 1000)});
app.use('/api/split-bill', overallRouter);

// Allow client-side routing
app.use('/*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;
