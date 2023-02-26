const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { serverConfig } = require('./constants');
const mailerRouter = require('./routes/mailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const corsOptions = {
  origin: serverConfig.WHITELIST,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

/* Telling the server to use the routes in the mailerRouter file. */
app.use('', mailerRouter);

/**
 * Handling inexsitent routes
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Opsss! The url: ' + req.url + ' of type: ' + req.method + ' does not exist',
  });
});

module.exports = app;
