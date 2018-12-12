const express = require('express');
const router = express.Router();
const weather = require('../model/Weather');
const responseFormatter = require('../services/responseFormatter');
const countryValidator = require('../middleware/countryValidator');

// https://github.com/Surnet/swagger-jsdoc/blob/master/example/v2/routes.js
/**
 * @swagger
 * parameters:
 *     ccParam:
 *         in: path
 *         name: cc
 *         description: Country code (2 Characters) or Country name
 *         required: true
 *         type: string
 *
 *     cityParam:
 *         in: path
 *         name: city
 *         description: City name
 *         required: true
 *         type: string
 *
 * responses:
 *   Response:
 *     200:
 *         description: Successfully got the data
 *         schema:
 *           $ref: '#/definitions/SuccessResponse'
 *     400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     404:
 *         description: Data Not Found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *     505:
 *         description: Try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *
 * definitions:
 *   Response:
 *     properties:
 *       status:
 *         type: number
 *         description: status code
 *       message:
 *         type: string
 *         description: error message
 *
 *   SuccessResponse:
 *     allOf:
 *       - $ref: '#/definitions/Response'
 *       - type: object
 *         properties:
 *           data:
 *             $ref: '#/definitions/Data'
 *
 *   ErrorResponse:
 *     allOf:
 *       - $ref: '#/definitions/Response'
 *       - type: object
 *         properties:
 *           data:
 *             type: string
 *
 *   Data:
 *      properties:
 *       city:
 *         $ref: '#/definitions/CityData'
 *       current:
 *         $ref: '#/definitions/WeatherData'
 *       forecast:
 *         type: array
 *         items:
 *           $ref: '#/definitions/ForecastData'
 *
 *   CityData:
 *     properties:
 *       name:
 *         type: string
 *       coord:
 *         type: object
 *         description: geo coordinates
 *       country:
 *         type: string
 *         description: country code
 *       population:
 *         type: number
 *         description: population of the city
 *
 *   WeatherData:
 *     properties:
 *       minCelsius:
 *         type: number
 *       maxCelsius:
 *         type: number
 *       minFahrenheit:
 *         type: number
 *       maxFahrenheit:
 *         type: number
 *       humidity:
 *         type: number
 *       windSpeed:
 *         type: number
 *       windDirection:
 *         type: string
 *
 *   ForecastData:
 *     allOf:
 *       - $ref: '#/definitions/WeatherData'
 *       - type: object
 *         properties:
 *          time:
 *            type: number
 */

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
