const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const emailConfig = require('./constants');

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (process.env.NODE_ENV == 'development') {
//   dotenv.config({
//     path: './.env',
//   });
// }

const corsOptions = {
  origin: emailConfig.WHITELIST,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Iniciar el servidor
app.listen(emailConfig.PORT, () => {
  console.log(`Server listening on port: http://localhost:${emailConfig.PORT}`);
});

// Configuring SMTP Server
const transporter = nodemailer.createTransport({
  host: emailConfig.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true, // true for 465 (use SSL), false for other ports
  logger: true, // log information in console
});

// Ruta para enviar correo electrónico
app.post('/sendMail', (req, res) => {
  const { name, to, message } = req.body;
  const from = emailConfig.CONTACT_EMAIL;

  const mailData = {
    from: from,
    to: 'alexjhcm@gmail.com',
    subject: '📌 New message sent from Personal Page',
    html: '<h3>Hola,</h3><p>' + name + ', cuyo correo es: ' + to + ' te ha enviado el siguiente mensaje:</p><p>' + message + '</p>',
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
  res.send(`Nodemailer with Express: ${process.env.NODE_ENV}, SMTP_USERNAME: ${process.env.SMTP_USERNAME}`);
});
