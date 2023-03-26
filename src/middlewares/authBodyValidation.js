import { body } from 'express-validator';

export const loginRules = [body('email').isEmail(), body('password').notEmpty()];

export const registerRules = [
  body('email').isEmail().exists(),
  body('password').isLength({ min: 8 }).exists(),
];

// export const updateProfileRules = [
//   body('firstName').optional(),
//   body('lastName').optional(),
//   body('email').isEmail().optional(),
// ];

// export const changePasswordRules = [
//   body('current').exists(),
//   body('password').isLength({ min: 6 }).exists(),
// ];
