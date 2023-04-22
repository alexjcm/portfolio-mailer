import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import mailerRouter from './routes/mailer';
import projectRouter from './routes/projects';
import swaggerRouter from './routes/swagger';
import authRouter from './routes/auth';
import corsOptions from './config/cors';
import sentryConfig from './config/sentry';
import authenticationMiddleware from './middlewares/authentication';
import logger from './logger/logger';

import db from './database';

const env = process.env.NODE_ENV || 'development';

const app = express();

//Sync Database
db.sync()
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((err) => {
    logger.error(err, 'Error connecting to database: ');
  });

app.use(authenticationMiddleware);
if (env !== 'development') {
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
app.use('', swaggerRouter);
app.use('', authRouter);

/**
 * Handling inexsitent routes. Default response for any other request
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Opsss! The url: ' + req.url + ' of type: ' + req.method + ' does not exist',
  });
});

if (env !== 'development') {
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

/**
 * Optional fallthrough error handler with Sentry
 */
app.use((err, req, res) => {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

module.exports = app;
