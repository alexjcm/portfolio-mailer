// using CommonJS
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mailerRouter = require('./routes/mailer');
const projectRouter = require('./routes/projects');
const corsOptions = require('./config/cors');
const sentryConfig = require('./config/sentry');
const Sentry = require('@sentry/node');

const app = express();

if (NODE_ENV !== 'development') {
  Sentry.init(sentryConfig(app));
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.use(cors(corsOptions));

app.use('', mailerRouter);
app.use('', projectRouter);

/**
 * Handling inexsitent routes. Default response for any other request
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Opsss! The url: ' + req.url + ' of type: ' + req.method + ' does not exist',
  });
});

if (NODE_ENV !== 'development') {
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

/**
 * Optional fallthrough error handler with Sentry
 */
app.use((err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

module.exports = app;
