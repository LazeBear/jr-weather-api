const express = require('express');
const router = express.Router();
const weather = require('../model/Weather');

router.get('/:cc/:city/all', (req, res) => {
  const { city, cc } = req.params;
  if (!cc || !city) {
    return res.status(400).send('Bad Request');
  }
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

router.get('/:cc/:city/current', (req, res) => {
  const { city, cc } = req.params;
  if (!cc || !city) {
    return res.status(400).send('Bad Request');
  }
  weather
    .getData(city, cc, 'current')
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

router.get('/:cc/:city/forecast', (req, res) => {
  const { city, cc } = req.params;
  if (!cc || !city) {
    return res.status(400).send('Bad Request');
  }
  weather
    .getData(city, cc, 'forecast')
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
