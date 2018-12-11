const City = require('./City');
const CurrentWeather = require('./CurrentWeather');
const ForecastWeather = require('./ForecastWeather');
const cache = require('../services/cache');
const axios = require('../services/axios');

class Weather {
  constructor() {}
  getData(city, country, type = 'all') {
    const key = `${city}/${country}`;
    if (cache.get(key)) {
      return new Promise((res, rej) => {
        const data = cache.get(key);
        res(filterData(data, type));
      });
    }
    return Promise.all(getWeatherData(city, country)).then(dataArray => {
      // Both requests are now complete
      const currentData = dataArray[0].data;
      const forecastData = dataArray[1].data;
      const weather = {
        city: new City(forecastData.city),
        current: new CurrentWeather(currentData),
        forecast: forecastData.list.map(i => new ForecastWeather(i))
      };
      //   console.log(weather);
      cache.set(key, weather);
      filterData(weather, type);
      return weather;
    });
  }
}

function filterData(data, type) {
  if (type === 'current') {
    delete data.forecast;
    return data;
  }
  if (type === 'forecast') {
    delete data.current;
    return data;
  }
  return data;
}

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

module.exports = new Weather();
