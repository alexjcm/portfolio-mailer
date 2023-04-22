import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import { emailConfig, messages } from '../utils/constants';
import logger from '../logger/logger';

dotenv.config();

/**
 * Configuring SMTP Server
 */
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
 * Send email
 */
export const sendEmail = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors, 'errors: ');
    return res.status(422).json({
      status: messages.FAIL_STATUS,
      errors: errors.array(),
    });
  }

  const { name, to, message } = req.body;

  const mailData = {
    from: emailConfig.SENDER_EMAIL,
    to: emailConfig.TO_EMAIL,
    subject: messages.DEFAULT_SUBJECT,
    html:
      '<h3>Hola,</h3><p>' +
      name +
      ', cuyo correo es: ' +
      to +
      ' te ha enviado el siguiente mensaje desde alexjcm.me:</p><p>' +
      message +
      '</p>',
  };

  logger.info(mailData, 'mailData: ');

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(500).send({
        status: messages.FAIL_STATUS,
        message: messages.FAILED_MESSAGE,
        error: error.message,
      });

      logger.error(error, 'Mail failed to send - ');
    } else {
      res.status(200).send({
        status: messages.SUCCESS_STATUS,
        message: messages.SUCCESS_MESSAGE,
        info: info.response,
      });
    }
  });
};

/**
 * Verify SMTP connection configuration
 */
export const testSTMPConection = (req, res) => {
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
        aditionalInfo: `Express.js and Nodemailer: ${process.env.NODE_ENV}`,
      });
    }
  });
};

/**
 * Test Sentry configuration
 */
export const testSentry = () => {
  throw new Error('Example test Sentry error!');
};
