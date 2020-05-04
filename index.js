const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { NotFoundError } = require('./utils/errors');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/logger');
const config = require('./config');

const userController = require('./controllers/user.controller');
const pizzaController = require('./controllers/pizza.controller');
const orderController = require('./controllers/order.controller');

const app = express();
const server = require('http').createServer(app);
const isProd = process.env.NODE_ENV === 'production';
console.log('NODE ENV',isProd);
console.log('STATIC',  path.resolve(__dirname, 'client', 'dist', 'client','index.html'));
console.log('USE STATIC', express.static('client/dist/client'));


app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', userController);
app.use('/api', pizzaController);
app.use('/api', orderController);

// Frontend static 
if (isProd){
  app.use(express.static('./client/dist/client'));
  app.get('/api/*', (res, req)=>{
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'client','index.html')
    )
  });
}

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
