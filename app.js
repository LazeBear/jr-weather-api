const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8181;
const axios = require('./services/axios');
const Weather = require('./model/Weather');

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 10, checkperiod: 60 * 11 });

// openweathermap.org/appid
app.get('/', (req, res) => res.send('hello world'));

app.get('/weather/:city', (req, res) => {
  const { city } = req.params;
  const { cc } = req.query;
  const key = `${city}/${cc}`;
  if (cache.get(key)) {
    return res.send(cache.get(key));
  }
  Promise.all(getWeatherData(city, cc))
    .then(dataArray => {
      // Both requests are now complete
      const weather = new Weather(dataArray[0].data, dataArray[1].data);
      //   console.log(weather);
      cache.set(key, weather);
      res.send(weather);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
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
  //   axios
  //     .get('/weather', { params: { q: cityStr, units: queries } })
  //     .then(({ data, response }) => {
  //       console.log('res');
  //       console.log(response);
  //       console.log(data);
  //       res.send(data);
  //     })
  //     .catch(error => {
  //       console.log(error.response.data);
  //       res.send(error.response.data);
  //       //   console.log('error');
  //       //   console.log(data);
  //       //   res.status(data.cod).send(data.message);
  //       //   res.status(err.data.cod).send(err.data.message);
  //     });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getWeatherData(city, cc) {
  let queryStr = city;
  if (cc) {
    queryStr += `,${cc}`;
  }
  return [
    axios.get('/weather', {
      params: { q: queryStr, units: 'metric' }
    }),
    axios.get('/forecast', {
      params: { q: queryStr, units: 'metric' }
    })
  ];
}
