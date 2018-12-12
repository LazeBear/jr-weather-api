const responseFormatter = require('../services/responseFormatter');

module.exports = (req, res, next) => {
  responseFormatter(res, 404, `Cannot ${req.method} ${req.url}`, null);
};
