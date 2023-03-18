import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import mailerRouter from './routes/mailer';
import projectRouter from './routes/projects';
import corsOptions from './config/cors';
import sentryConfig from './config/sentry';

const app = express();

if (process.env.NODE_ENV !== 'development') {
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
app.use(compression());

/**
 * Load routes
 */
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

if (process.env.NODE_ENV !== 'development') {
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

/**
 * Optional fallthrough error handler with Sentry
 */
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

module.exports = app;
