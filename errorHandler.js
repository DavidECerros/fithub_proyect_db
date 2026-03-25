const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Error interno del servidor',
    path: req.originalUrl
  });
};

module.exports = errorHandler;
