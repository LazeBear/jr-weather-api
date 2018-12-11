const express = require('express');
const router = express.Router();
const weather = require('../model/Weather');

router.get('/:city', (req, res) => {
  const { city } = req.params;
  const { cc } = req.query;
  weather
    .getData(city, cc)
    .then(data => res.send(data))
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        res.status(error.response.data.cod).send(error.response.data.message);
        return;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      res.status(403).send('Bad Request');
    });
});

module.exports = router;
