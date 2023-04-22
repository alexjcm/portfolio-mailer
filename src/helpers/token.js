import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const secretOrPrivateKey = process.env.JWT_SECRET_KEY;

export const generateToken = (payload, expiresIn = '1h') => {
  const issuer = 'portfolio-ws';
  const options = {
    expiresIn,
    issuer,
  };

  return jwt.sign(payload, secretOrPrivateKey, options);
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
      if (err) {
        reject('Failed to authenticate token.');
      } else {
        logger.info(decoded, 'decoded:');
        resolve(decoded);
      }
    });
  });
};
