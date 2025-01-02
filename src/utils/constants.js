const serverConfig = {
  WHITELIST: ['http://localhost:3000', 'https://alexjcm.com'],
};

const cacheConfig = {
  PROJECTS_CACHE_KEY: 'projects:active',
  PROJECTS_CACHE_TTL: 2592000, // 30 days in seconds
};

const emailConfig = {
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_USE_SSL: true, // true for 465 (use SSL), false for other ports
  SENDER_EMAIL: 'alex.test.jcm@gmail.com',
  TO_EMAIL: 'alexjhcm@gmail.com',
};

const messages = {
  FAIL_STATUS: 'fail',
  SUCCESS_STATUS: 'success',
  FAILED_MESSAGE: 'Mail failed to send',
  SUCCESS_MESSAGE: 'Mail send',
  DEFAULT_SUBJECT: '📌 New message sent from personal page alexjcm.com',
};

export { serverConfig, emailConfig, messages, cacheConfig };
