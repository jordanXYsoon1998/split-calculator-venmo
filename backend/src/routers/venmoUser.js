const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Venmo functionality! You can access this because you have logged in as a SplitBill user!');
});

module.exports = router;
