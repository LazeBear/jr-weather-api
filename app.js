const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8181;
const weather = require('./routes/weather');

app.use('/api/weather', weather);

// openweathermap.org/appid
app.get('/', (req, res) => res.send('welcome to jr-weather-app!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
