const express = require('express');
const VenmoUser = require('../models/venmoUser');
const { consistentErr } = require('../utils/error');
const venmoUserFetch = require('../middleware/venmoUserFetch');

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Venmo functionality! You can access this because you have logged in as a SplitBill user!');
});

// First step in login with username and password
// TODO: Implement checking to ensure only one valid/in-progress login at any time
router.post('/login', async (req, res) => {
  try {
    // Associate this attempted Venmo login with this User
    const venmoUser = VenmoUser({ owner: req.user._id });
    const otpSecret = await venmoUser.sendCredentials(req.body.email, req.body.password);
    venmoUser.otpSecret = otpSecret;

    // Initiate these two asynchronous requests in parallel
    const phonePromise = venmoUser.getPhoneAuth();
    const otpReqPromise = venmoUser.requestOtp();

    const otpPhoneNumber = await phonePromise;
    const otpRequested = await otpReqPromise;

    venmoUser.phoneNumber = otpPhoneNumber;
    venmoUser.otpRequested = otpRequested;
    await venmoUser.save();

    // Send back success and phone number to client
    res.status(200).send({ otpReqSuccess: otpRequested, sentTo: otpPhoneNumber });
  } catch (e) {
    res.status(400).send(consistentErr({
      message: e.message,
      name: e.name
    }));
  }
});

// Second step in login with sms OTP
router.post('/login/otp', venmoUserFetch, async (req, res) => {
  try {
    const actualVenmoObject = await req.venmoUser.getUserDetails(req.body.otp);
    req.venmoUser.accessToken = actualVenmoObject.access_token;
    req.user.venmoLoggedIn = true;
    await Promise.all([req.venmoUser.save(), req.user.save()]);
    res.send(200).send({
      message: 'Successfully logged in to Venmo!'
    });
  } catch (e) {
    res.status(400).send(consistentErr({
      message: e.message,
      name: e.name
    }));
  }
});

// Logout/Revoke Venmo access token
router.post('/logout', venmoUserFetch, async (req, res) => {
  await req.venmoUser.remove();
  res.sendStatus(200);
});

module.exports = router;