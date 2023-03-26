import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT = 5432, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const defaultConfig = {
  dialect: 'sqlite',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  storage: './data/projects.db',
};

const development = {
  ...defaultConfig,
  logging: false,
};

const test = {
  ...defaultConfig,
  logging: false,
};

const production = {
  ...defaultConfig,
  logging: false,
};

export { development, test, production };
