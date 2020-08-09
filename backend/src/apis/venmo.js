const axios = require('axios');

const VENMO_BASE_URL = 'https://api.venmo.com/v1';
const VENMO_USER_AGENT = 'Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)';

// The deviceId is unique or randomly generated for each user
const initVenmoClient = (deviceId) => axios.create({
  baseURL: VENMO_BASE_URL,
  headers: {
    'User-Agent': VENMO_USER_AGENT,
    'device-id': deviceId
  }
});

module.exports = initVenmoClient;
