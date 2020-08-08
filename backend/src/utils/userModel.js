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
  contains_digit = /\d/.test(password);
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

module.exports = {
  validPassword
};
