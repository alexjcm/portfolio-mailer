import { serverConfig } from '../utils/constants';

const configCors = {
  origin: serverConfig.WHITELIST,
  //origin: process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200, // For legacy browser support
};

export default configCors;
