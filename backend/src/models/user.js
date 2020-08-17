const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const VenmoUser = require('./venmoUser');
const { validPassword } = require('../utils/userModel');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      conditions = validPassword(value);
      if (!conditions.all) {
        throw new Error('Password is invalid');
      }
    }
  },
  venmoLoggedIn: {
    type: Boolean,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

userSchema.virtual('venmoUser', {
  ref: 'VenmoUser',
  localField: '_id',
  foreignField: 'owner',
  justOne: true
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  // Add this token to the list of authorized tokens for this user
  // This allows us to invalidate the tokens when the user wishes to logout
  user.tokens = [...user.tokens, { token }];
  await user.save();

  return token;
};

userSchema.methods.revokeAuthToken = async function (token) {
  const user = this;
  // Remove this login token from the user
  user.tokens = user.tokens.filter(currToken => currToken.token !== token);
  await user.save();
  return true;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash the plaintext password and save the hash and salt in the DB
userSchema.pre('save', async function(next) {
  const user = this;

  // Only hash the password if it's been modified
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const bcryptSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(user.password, bcryptSalt);
    // Overwrite the plaintext password with the hashed version
    user.password = hashedPassword;
  } catch (e) {
    return next(e);
  }

  next();
});

// Middleware to handle MongoDB error of duplicate key
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else if (error._message === 'User validation failed') {
    // TODO: Decide if you want to handle multiple validation error
    //        to look nicer
    next();
  } else {
    next();
  }
});

// Make sure to delete the associated VenmoUser login details if this User is deleted
userSchema.pre('remove', async function (next) {
  const user = this;
  await VenmoUser.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
