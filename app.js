const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const welcome = require('./routes/welcome');
const weather = require('./routes/weather');
const logger = require('./services/logger');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

const port = process.env.PORT || 8181;

process.on('uncaughtException', e => {
  logger.error(e.message);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  logger.error(e.message);
  process.exit(1);
});

app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
} else {
  app.use(morgan('short'));
}

app.use('/', welcome);
app.use('/api/weather', weather);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => logger.info(`App listening on port ${port}!`));
