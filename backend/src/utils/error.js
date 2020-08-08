const consistentErr = ({ message, code, name }) => {
  return {
    error: {
      message,
      code,
      name
    }
  };
};

module.exports = {
  consistentErr
};
