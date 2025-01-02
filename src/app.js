// Import this first!
import "./config/instrument";
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
import authenticationMiddleware from './middlewares/authentication';
import logger from './logger/logger';

import db from './database';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

const app = express();

db.sync()
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((err) => {
    logger.error(err, 'Error connecting to database: ');
  });

app.use(authenticationMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Add this after all routes,
// but before any and other error-handling middlewares are defined
if (env !== 'development') {
  Sentry.setupExpressErrorHandler(app);
}

module.exports = app;
