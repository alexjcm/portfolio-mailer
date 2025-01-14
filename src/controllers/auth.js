import db from '../database';
import { compare } from 'bcrypt';
import * as tokenHelper from '../helpers/token';
import logger from '../logger/logger';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.models.user.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'There is no user with this email address!' });
    }

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    const data = { id: user.id, email: user.email };
    const expiresIn = '1h';
    let token;
    try {
      token = tokenHelper.generateToken(data, expiresIn);
      logger.info('Token generated');
    } catch (err) {
      logger.error(err, 'Error generating token:');
      return res.status(500).json({ message: 'Internal server error D' });
    }

    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    delete req.user.dataValues.password;
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const user = await db.models.user.create(req.body, {
    });

    const data = { id: user.id, email: user.email };
    const expiresIn = '1h';
    const token = tokenHelper.generateToken(data, expiresIn);
    res.status(201).json({ token: token });
  } catch (err) {
    logger.error(err, 'Error register:');
    next(err);
  }
};
