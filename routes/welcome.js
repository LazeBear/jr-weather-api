const express = require('express');
const router = express.Router();
const responseFormatter = require('../services/responseFormatter');

router.get('/', (req, res) => {
  responseFormatter(res, 200, 'Welcome to the weather api!', null);
});

module.exports = router;
