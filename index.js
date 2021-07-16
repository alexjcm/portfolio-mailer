'use strict';
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

// Configuring SMTP Server
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false, // true for 465, false for other ports
});

/**
 * http://localhost:PORT/send-mail
 */
app.post('/send-mail', (req, res) => {
  const {to, subject, text} = req.body;
  const mailData = {
    from: '"Alex JCM" <alexjhcm@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log('error: ', error);
      res.status(500).send(error.message);
      return console.log('error: ', error);
    }
    res.status(200).send({message: 'Mail send', message_id: info.messageId});
  });
});

app.get('/test', (req, res) => {
  res.send(`Nodemailer with express: ${process.env.NODE_ENV}`);
});
