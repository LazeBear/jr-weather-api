const express = require('express');
const router = express.Router();
const responseFormatter = require('../services/responseFormatter');

/**
 * @swagger
 * /:
 *   get:
 *     description: welcome response
 *     responses:
 *       200:
 *         description: welcome response
 */
router.get('/', (req, res) => {
  responseFormatter(
    res,
    200,
    "Welcome to the weather api! Visit '/api-docs' for help",
    null
  );
});

module.exports = router;
