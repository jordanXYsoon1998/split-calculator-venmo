const express = require('express');
const User = require('../models/user');

const router =  new express.Router();

// Create new user
router.post('/users', async (req, res) => {
  const user = User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
