const { serverConfig } = require('../utils/constants');

const configCors = {
    origin: serverConfig.WHITELIST,
    //origin: process.env.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200, // For legacy browser support
    // allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
    // exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token'],
};

module.exports = configCors;