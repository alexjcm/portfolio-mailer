const serverConfig = {
  PORT: 5000,
  WHITELIST: ['http://localhost:3000', 'https://alexjcm.me'],
};

const emailConfig = {
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_USE_SSL: true, // true for 465 (use SSL), false for other ports
  SENDER_EMAIL: 'certificacion.cis@gmail.com',
  TO_EMAIL: 'alexjhcm@gmail.com',
};

const messages = {
  FAIL_STATUS: 'fail',
  SUCCESS_STATUS: 'success',
  FAILED_MESSAGE: 'Mail failed to send',
  SUCCESS_MESSAGE: 'Mail send',
  DEFAULT_SUBJECT: '📌 New message sent from personal page alexjcm.me',
};

module.exports = { serverConfig, emailConfig, messages };
