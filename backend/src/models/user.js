const mongoose = require('mongoose');
const validator = require('validator');

const validPassword = (password) => {
  /*
   * Must be at least 8 characters
   * Must contain at least one uppercase and one lowercase character
   * Must contain at least one digit
   * Must contain at least one special character ($, #, @, !, %, ^, &, *, (, ))
   */
  at_least_eight = password.length >= 8;
  uppercase = /[A-Z]/.test(password);
  lowercase = /[a-z]/.test(password);
  contains_digit = /\d\.test(password);
  special_char = /[!@#$%^&*().,?\/]/.test(password);
  
  all_satisfied = [ at_least_eight, uppercase, lowercase, contains_digit, special_char ].every(val => val);
  return {
    all: all_satisfied,
    at_least_eight,
    uppercase,
    lowercase,
    contains_digit,
    special_char
  };
};

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
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
