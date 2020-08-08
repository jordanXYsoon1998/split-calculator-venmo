const mongoose = require('mongoose');
const { randomDeviceId } = require('../utils/venmoUserModel');

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

const VenmoUser = mongoose.model('VenmoUser', venmoUserSchema);

module.exports = VenmoUser;
