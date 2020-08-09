const VenmoUser = require('../models/venmoUser');
const { consistentErr } = require('../utils/error');

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

module.exports = venmoUserFetch;
