const VenmoUser = require('../models/venmoUser');
const { consistentErr } = require('../utils/error');

/**
 * Middleware before initiating Venmo login to avoid repeat authentication
 */
const venmoUserCheckClean = async (req, res, next) => {
  try {
    const venmoUser = await VenmoUser.findOne({ owner: req.user._id });

    if (venmoUser !== null) {
      // Check accessToken etc
      if (venmoUser.accessToken) {
        throw new Error('Already authenticated with Venmo');
      }
      // Otherwise, it's an incomplete login
      // Just clean it up and start fresh
      await venmoUser.remove();
    }

    next();
  } catch (e) {
    return res.status(400).send(consistentErr({
      message: e.message,
      name: e.name
    }));
  }
};

/**
 * Middleware to prefetch the VenmoUser object
 * @returns {null}
 */
const venmoUserFetch = async (req, res, next) => {
  try {
    const venmoUser = await VenmoUser.findOne({ owner: req.user._id });

    if (!venmoUser) {
      throw new Error();
    }

    req.venmoUser = venmoUser;

    next();
  } catch (e) {
    return res.status(401).send(consistentErr({
      message: 'Please initiate Venmo login procedure',
      code: 402,
      name: 'Error'
    }));
  }
};

module.exports = {
  venmoUserFetch,
  venmoUserCheckClean
};
