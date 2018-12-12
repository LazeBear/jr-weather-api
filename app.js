const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const weather = require('./routes/weather');
const logger = require('./services/logger');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 8181;

process.on('uncaughtException', e => {
  logger.error(e.message);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  logger.error(e.message);
  process.exit(1);
  //   throw e;
});

app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
} else {
  app.use(morgan('short'));
}

app.use('/api/weather', weather);

app.get('/', (req, res) => res.send('welcome to jr-weather-app!'));

app.use(errorHandler);

app.listen(port, () => logger.info(`App listening on port ${port}!`));
