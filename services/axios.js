const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  params: {
    APPID: '11968cd850d06577bf436eec5f63a333',
    units: 'metric'
  }
});
// instance.interceptors.request.use(
//   function(config) {
//     console.log('config', config);
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     console.log(error);
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
module.exports = instance;
