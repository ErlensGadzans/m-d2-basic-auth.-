// ERROR HANDLERS
const badRequestHandler = (error, req, res, next) => {
  if (error.httpStatusCode === 400) {
    res.status(400).send(error.message);
  }
  next(error);
}; // 400

const forbiddenHandler = (error, req, res, next) => {
  if (error.httpStatusCode === 403) {
    res.status(403).send(error.message || "Forbidden!");
  }
  next(error);
}; // 403

const notFoundHandler = (error, req, res, next) => {
  if (error.httpStatusCode === 404) {
    res.status(404).send(error.message || "Resource not found!");
  }
  next(error);
}; // 404

// catch all
const genericErrorHandler = (error, req, res, next) => {
  if (!res.headersSent) {
    // checks if another error middleware already sent a response
    res.status(error.httpStatusCode || 500).send(error.message);
  }
};

module.exports = {
  badRequestHandler,
  forbiddenHandler,
  notFoundHandler,
  genericErrorHandler,
};
