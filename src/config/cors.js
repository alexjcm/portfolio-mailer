import { serverConfig } from '../utils/constants';

const corsOptions = {
  origin: serverConfig.WHITELIST,
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
