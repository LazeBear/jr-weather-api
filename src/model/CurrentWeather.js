class CurrentWeather {
  constructor(rawData) {
    const { main, weather, wind } = rawData;
    this.minCelsius = main.temp_min;
    this.maxCelsius = main.temp_max;
    this.minFahrenheit = this.calculateFahrenheit(main.temp_min);
    this.maxFahrenheit = this.calculateFahrenheit(main.temp_max);
    this.humidity = main.humidity;
    this.weather = weather.main;
    this.weatherDesc = weather.description;
    this.windSpeed = wind.speed;
    this.windDirection = this.calculateWindDirection(wind.deg);
  }

  calculateWindDirection(degree) {
    var val = Math.floor((degree + 22.5) / 45);
    var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[val % 8];
  }

  calculateFahrenheit(celsius) {
    // return Number.parseFloat(((celsius * 9) / 5 + 32).toFixed(2));
    const fahrenheit = (celsius * 9) / 5 + 32;
    return Math.round(fahrenheit * 1e2) / 1e2;
  }
}

module.exports = CurrentWeather;
