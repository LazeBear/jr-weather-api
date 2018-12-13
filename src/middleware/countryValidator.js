const responseFormatter = require('../services/responseFormatter');
const { getCode, getName } = require('country-list');

module.exports = (req, res, next) => {
  const { cc } = req.params;
  if (cc.length === 2) {
    if (getName(cc)) {
      return next();
    }
  } else {
    if (getCode(cc)) {
      req.params.cc = getCode(cc);
      return next();
    }
  }
  responseFormatter(res, 400, 'Invalid country name or country code', null);
};
