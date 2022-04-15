const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
  console.log(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;