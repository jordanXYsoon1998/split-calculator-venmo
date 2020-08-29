const express = require('express');
const userAuth = require('../middleware/userAuth');
const userRouter = require('./user');
const venmoUserRouter = require('./venmoUser');

const router = new express.Router();

router.use('/users', userRouter);
// Set authentication middleware because user needs to be logged in to our
// platform before they can interact with any Venmo functionality including login
router.use('/venmoUsers', userAuth, venmoUserRouter);
router.get('/', (req, res) => {
  res.send('Welcome to server for VenSplitMo Venmo API!');
});

module.exports = router;
