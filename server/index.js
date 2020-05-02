const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { NotFoundError } = require('./utils/errors');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/logger');
const config = require('./config');

const userController = require('./controllers/user.controller');

const app = express();
const server = require('http').createServer(app);

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', userController);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || [];

  logger.error(err);

  res.status(status).json({ status, message, details });
});

mongoose
  .then(() =>
    server.listen(config.port, () => logger.info(`API server listening ${config.port} port.`))
  )
  .catch(err => logger.error(err));