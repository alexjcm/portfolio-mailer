import { serverConfig } from '../utils/constants';

const configCors = {
  origin: serverConfig.WHITELIST,
  optionsSuccessStatus: 200, // For legacy browser support
  allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token'],
};

export default configCors;
