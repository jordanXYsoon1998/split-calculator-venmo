const mongoose = require('mongoose');
const { randomDeviceId } = require('../utils/venmoUserModel');
const initVenmoClient = require('../apis/venmo.js');

const venmoUserSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  deviceId: {
    type: String,
    default: randomDeviceId
  },
  otpSecret: {
    type: String
  },
  otpRequested: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String
  },
  accessToken: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

/**
 * First step in Venmo Login.
 * Takes in the email and password, and returns OTP from Venmo Server if they're valid
 * @param {String} email
 * @param {String} password
 * @returns {Promise} Resolves to the OTP secret needed for next login stages
 */
venmoUserSchema.methods.sendCredentials = async function (email, password) {
  const venmoUser = this;
  // First step in login: Send credentials to Venmo API
  const credentialPath = '/oauth/access_token';
  const venmoClient = initVenmoClient(venmoUser.deviceId);
  try {
    const credentialResponse = await venmoClient.post(credentialPath, {
      phone_email_or_username: email,
      client_id: "1",
      password
    }, {
      validateStatus(status) {
        // Typical behavior for this request includes 401 or 400
        return status < 500;
      }
    });

    // Store otp secret
    if (!credentialResponse.headers['venmo-otp'] && !credentialResponse.headers['venmo-otp-secret']) {
      throw new Error('Invalid Venmo credentials');
    }

    return credentialResponse.headers['venmo-otp-secret'];
  } catch (err) {
    throw err;
  }
};

/**
 * Get the phone number where the OTP will be texted to.
 * This info will be useful for client.
 * @returns {Promise} Resolves to the phone number
 */
venmoUserSchema.methods.getPhoneAuth = async function () {
  const venmoUser = this;
  // Fetch the list of authentication methods
  const authListPath = '/account/two-factor/token?client_id=1';
  const venmoClient = initVenmoClient(venmoUser.deviceId);
  try {
    const response = await venmoClient.get(authListPath, {
      headers: {
        'venmo-otp-secret': venmoUser.otpSecret
      }
    });

    const body = response.data;

    if (!body || !body.data || !body.data.devices
          || !body.data.devices[0]) {
      throw new Error();
    }
    const { value, device_type } = body.data.devices[0];

    if (device_type != 'sms') {
      throw new Error();
    }

    return value;
  } catch (err) {
    throw new Error('Failed to fetch SMS authentication method');
  }
};

/**
 * Ask Venmo server to text the OTP to the user's phone number
 * @returns {Boolean} True if successful request
 */
venmoUserSchema.methods.requestOtp = async function () {
  const venmoUser = this;
  const otpRequestPath = '/account/two-factor/token';
  const venmoClient = initVenmoClient(venmoUser.deviceId);
  try {
    const response = await venmoClient.post(otpRequestPath, { via: 'sms' }, {
      headers: {
        'venmo-otp-secret': venmoUser.otpSecret
      }
    });

    if (!response.data.data || !response.data.data.status
          || response.data.data.status !== 'sent') {
      throw new Error();
    }

    return true;
  } catch (err) {
    throw new Error('Failed to request OTP through text');
  }
};

/**
 * Takes OTP from user and sends it to Venmo server
 * @param {String} Otp from user client
 * @returns {Object} User object from Venmo server
 */
venmoUserSchema.methods.getUserDetails = async function (otp) {
  const venmoUser = this;
  const otpSubmitPath = '/oauth/access_token?client_id=1';
  const venmoClient = initVenmoClient(venmoUser.deviceId);
  try {
    const response = await venmoClient.post(otpSubmitPath, {}, {
      headers: {
        'venmo-otp-secret': venmoUser.otpSecret,
        'Venmo-Otp': otp
      }
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (err) {
    throw new Error('Login with OTP failed');
  }
};

// Make sure to revoke the Venmo access token if present
venmoUserSchema.pre('remove', async function (next) {
  const venmoUser = this;
  if (!venmoUser.accessToken) {
    // No need to revoke the token
    next();
  } else {
    const revokeAccessTokenPath = '/oauth/access_token';
    const venmoClient = initVenmoClient(venmoUser.deviceId);
    await venmoClient.delete(revokeAccessTokenPath, {
      headers: {
        'Authorization': `Bearer ${venmoUser.accessToken}`
      }
    });
    next();
  }
});

const VenmoUser = mongoose.model('VenmoUser', venmoUserSchema);

module.exports = VenmoUser;
