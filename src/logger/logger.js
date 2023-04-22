import pino from 'pino';

const env = process.env.NODE_ENV || 'development';

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  transport:
    env === 'development' ? {
      target: 'pino-pretty',
      options: { colorize: true },
    } : undefined,
});

export default logger;
