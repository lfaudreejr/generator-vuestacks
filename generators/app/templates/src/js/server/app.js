const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const lusca = require('lusca');
const morgan = require('morgan');
const path = require('path');

const router = require('./routes');

/**
 * Debug loggin
 */
require('debug')('app:app');

/**
 * Express App
 */
const app = express();

/**
 * Global Middleware
 */
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Router
 */
app.use('/api', router);

/**
 * Serving static production files
 */
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../dist/client')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });
}

/**
 * 404 Handler
 */
app.use((req, res, next) => {
  const err = new Error('404 Page not found.');
  err.message = '404';
  next(err);
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(Number(err.message) || 500).json(err);
});

module.exports = app;
