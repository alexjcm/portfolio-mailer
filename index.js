const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { validationResult } = require('express-validator');
const { bodyEmailValidation } = require('./validations');
const { serverConfig, emailConfig, messages } = require('./constants');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

const corsOptions = {
  origin: serverConfig.WHITELIST,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
// Start server
app.listen(serverConfig.PORT, () => {
  console.log(`Server listening on port: ${serverConfig.PORT}`);
});

// Configuring SMTP Server
const transporter = nodemailer.createTransport({
  host: emailConfig.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: emailConfig.SMTP_USE_SSL,
  logger: false, // log information in console
});

/**
 * 
 */
app.post('/sendMail', bodyEmailValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: messages.FAIL_STATUS,
      errors: errors.array()
    });
  }

  const { name, to, message } = req.body;

  const mailData = {
    from: emailConfig.SENDER_EMAIL,
    to: emailConfig.TO_EMAIL,
    subject: messages.DEFAULT_SUBJECT,
    html: '<h3>Hola,</h3><p>' + name + ', cuyo correo es: ' + to + ' te ha enviado el siguiente mensaje desde alexjcm.me:</p><p>' + message + '</p>',
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(500).send({
        status: messages.FAIL_STATUS,
        message: messages.FAILED_MESSAGE,
        error: error.message,
      });
    }
    res.status(200).send({
      status: messages.SUCCESS_STATUS,
      message: messages.SUCCESS_MESSAGE,
      info: info.response
    });
  });
});

app.get('/test', (req, res) => {
  // Verify SMTP connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      res.status(500).send({
        status: 'not ready',
        msg: error,
        error: error.message,
      });
    } else {
      res.status(200).send({
        status: 'ready',
        message: 'Server is ready to take our messages',
        aditionalInfo: `Express.js and Nodemailer: ${process.env.NODE_ENV}`
      });
    }
  });
});
