import jwt from 'jsonwebtoken';

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
        console.log('decoded:', decoded);
        resolve(decoded);
      }
    });
  });
};
