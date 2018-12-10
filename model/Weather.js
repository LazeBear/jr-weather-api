const City = require('./City');
const CurrentWeather = require('./CurrentWeather');
const ForecastWeather = require('./ForecastWeather');

class Weather {
  constructor(currentData, forecastData) {
    this.city = new City(forecastData.city);
    this.currentWeather = new CurrentWeather(currentData);
    this.forecastWeather = forecastData.list.map(i => new ForecastWeather(i));
  }
}

module.exports = Weather;
