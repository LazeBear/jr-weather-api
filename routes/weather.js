const express = require('express');
const router = express.Router();
const weather = require('../model/Weather');
const responseFormatter = require('../services/responseFormatter');

// https://expressjs.com/en/guide/error-handling.html
router.get('/:cc/:city/all', (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc)
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

router.get('/:cc/:city/current', (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc, 'current')
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

router.get('/:cc/:city/forecast', (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc, 'forecast')
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

module.exports = router;
