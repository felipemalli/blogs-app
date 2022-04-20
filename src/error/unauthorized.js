const unauthorized = (message) => ({
  message,
  errorCode: 401,
  stack: Error().stack,
});

module.exports = unauthorized; 