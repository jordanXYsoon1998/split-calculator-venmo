const express = require('express');
const { initAuthVenmoClient } = require('../apis/venmo');
const { consistentErr } = require('../utils/error');

const router = new express.Router();

/*
 * A subrouter to handle the pertinent Venmo operations after they have been authenticated.
 * This API helps the client-side do its job.
 *
 * These operations include but aren't limited to:
 * - Fetching user's Payment methods
 * - Fetching user's friend list
 * - Handling a batch list of payments/requests to be made
 */

router.get('/', (req, res) => {
  res.send('Welcome to Venmo operations! You can access this because your SplitBill account has an authenticated Venmo login');
});

// Fetch payment methods
router.get('/payment-methods', async (req, res) => {
  const paymentMethodsPath = '/payment-methods';
  const venmoClient = initAuthVenmoClient(req.venmoUser.accessToken);
  try {
    const paymentMethodsResponse = await venmoClient.get(paymentMethodsPath);
    res.status(200).send({ data: paymentMethodsResponse.data.data });
  } catch (err) {
    res.status(400).send(consistentErr({
      message: err.message,
      name: err.name
    }));
  }
});

// Fetch friend list
router.get('/friends', async (req, res) => {
  const friendsPath = `/users/${req.venmoUser.userId}/friends`;
  const venmoClient = initAuthVenmoClient(req.venmoUser.accessToken);
  const fetchLimit = req.query.limit || 1000;
  const fetchOffset = req.query.offset || 0;

  try {
    const friendsResponse = await venmoClient.get(friendsPath, {
      params: {
        limit: fetchLimit,
        offset: fetchOffset,
      }
    });
    res.status(200).send(friendsResponse.data);
  } catch (err) {
    res.status(400).send(consistentErr({
      message: err.message,
      name: err.name
    }));
  }
});

// Handle payments/requests
router.post('/pay-or-request', async (req, res) => {
  const paymentPath = '/payments';
  const venmoClient = initAuthVenmoClient(req.venmoUser.accessToken);
  const paymentPromises = req.body.payloads.map(payload => {
    // Initiate the requests in parallel
    return venmoClient.post(paymentPath, payload);
  });

  // TODO: This seems dangerous.
  // Maybe find a way to assign the payload to each promise so we can relay to client
  // which requests failed
  // TODO: Maybe update the latest balance with the timestamps of the transactions?
  try {
    const responses = await Promise.all(paymentPromises);
    // Extract the response data
    const responsesData = responses.map(response => response.data);
    res.send({
      message: 'All payments and requests went through',
      results: responsesData
    });
  } catch (err) {
    res.status(400).send(consistentErr({
      message: `${err.message}...One of the transactions failed`,
      name: err.name
    }));
  }
});

module.exports = router;
