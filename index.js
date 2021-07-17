const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

// Configuring SMTP Server
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false, // true for 465 (use SSL), false for other ports
  debug: true, // show debug output
  logger: true, // log information in console
});

app.post('/send-mail', (req, res) => {
  const {name, from, html} = req.body;
  const to = process.env.CONTACT_EMAIL;
  console.log('from --> ', from);

  const mailData = {
    from: name + ' <' + from + '>',
    to: to,
    subject: '📌 New message sent from Personal Page',
    html: html,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log('error: ', error);
      res.status(500).send({
        status: 'fail',
        message: 'Mail failed to send',
        error: error.message,
      });
    }
    res.status(200).send({
      status: 'success',
      message: 'Mail send',
    });
  });
});

app.get('/test', (req, res) => {
  res.send(`Nodemailer with Express: ${process.env.NODE_ENV}`);
});
