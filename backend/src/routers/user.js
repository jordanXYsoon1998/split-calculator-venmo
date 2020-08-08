const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create new user
router.post('/', async (req, res) => {
  const user = User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true });
    res.send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Logout
router.post('/logout', auth, async (req, res) => {
  // Revoke the authtoken
  try {
    const logoutSuccess = req.user.revokeAuthToken(req.token);
    if (!logoutSuccess) {
      throw new Error('Failed to logout');
    }

    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Fetch User Profile to check if Venmo logged in/access token
router.get('/me', auth, async (req, res) => {
  res.send({ user: req.user });
});

// Update User Deets like email/password
router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);

    await req.user.save();
    res.status(200).send({ user: req.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete the user account from DB
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
