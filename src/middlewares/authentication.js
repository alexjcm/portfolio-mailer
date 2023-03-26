import db from '../database';
import * as tokenHelper from '../helpers/token';

export default async function authenticate(req, res, next) {
  const authorizationHeader = req.headers.authorization || '';

  // Firstly, set request user to null to other middleware
  req.user = null;
  if (!authorizationHeader) {
    console.warn('Check for empty Authorization header');
    return next();
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    console.warn('Make sure the token is bearer token');
    return next();
  }

  let decodedToken;
  try {
    const token = authorizationHeader.substring(7);
    decodedToken = await tokenHelper.verifyToken(token);
  } catch (error) {
    return res.status(401).json({ message: error });
  }

  const user = await db.models.user.findByPk(decodedToken.id).catch(() => null);
  if (!user) {
    return next({ status: 401, message: 'There is no user' });
  }

  // Set request user to other middleware
  req.user = user;

  // Check if the token renewal time is coming
  // const now = new Date();
  // const exp = new Date(tokenData.exp * 1000);
  // const difference = exp.getTime() - now.getTime();
  // const minutes = Math.round(difference / 60000);

  // console.log('Check for refresh token and time left')
  // if (minutes < 15) {
  //   // Check the user of refresh token
  //   if (refreshTokenData.id === tokenData.id) {
  //     // Generate new tokens
  //     const newToken = user.generateToken();

  //     // Set response headers
  //     res.setHeader('Token', newToken);
  //   }
  // }

  // Go to next middleware
  return next();
}
