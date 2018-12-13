const express = require('express');
const router = express.Router();
const weather = require('../model/Weather');
const responseFormatter = require('../services/responseFormatter');
const countryValidator = require('../middleware/countryValidator');

// https://github.com/Surnet/swagger-jsdoc/blob/master/example/v2/routes.js

// https://expressjs.com/en/guide/error-handling.html
/**
 * @swagger
 *
 * /api/weather/{cc}/{city}/all:
 *   get:
 *     tags:
 *      - Weather
 *     description: Get all weather data about a city
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/ccParam'
 *       - $ref: '#/parameters/cityParam'
 *     responses:
 *       allOf:
 *         - $ref: '#/responses/Response'
 */
router.get('/:cc/:city/all', countryValidator, (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc)
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

/**
 * @swagger
 *
 * /api/weather/{cc}/{city}/current:
 *   get:
 *     tags:
 *      - Weather
 *     description: Get current weather data about a city
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/ccParam'
 *       - $ref: '#/parameters/cityParam'
 *     responses:
 *       allOf:
 *         - $ref: '#/responses/Response'
 */
router.get('/:cc/:city/current', countryValidator, (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc, 'current')
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

/**
 * @swagger
 *
 * /api/weather/{cc}/{city}/forecast:
 *   get:
 *     tags:
 *      - Weather
 *     description: Get forecast weather data about a city
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/ccParam'
 *       - $ref: '#/parameters/cityParam'
 *     responses:
 *       allOf:
 *         - $ref: '#/responses/Response'
 */
router.get('/:cc/:city/forecast', countryValidator, (req, res, next) => {
  const { city, cc } = req.params;
  weather
    .getData(city, cc, 'forecast')
    .then(data => responseFormatter(res, 200, null, data))
    .catch(error => {
      next({ content: error, type: 'axios' });
    });
});

module.exports = router;
