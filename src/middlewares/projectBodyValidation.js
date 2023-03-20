import { body, validationResult } from 'express-validator';

export const projectBodyValidation = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .isLength({ max: 64 })
    .withMessage('The "name" field must have a maximum length of 64 characters'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .isString()
    .isLength({ max: 255 })
    .withMessage('The "description" field must have a maximum length of 255 characters'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isBoolean()
    .withMessage('The "status" field must be a boolean value'),
  body('projectLink')
    .optional()
    .isLength({ max: 255 })
    .withMessage('The "projectLink" field must have a maximum length of 255 characters'),
  body('imageProjectLink')
    .optional()
    .isLength({ max: 255 })
    .withMessage('The "imageProjectLink" field must have a maximum length of 255 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If the validation passes, next() is called to move to the next middleware or controller.
    next();
  },
];

export const idProjectBodyValidation = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The "id" field is required')
    .isInt()
    .withMessage('The "id" field must be an integer'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If the validation passes, next() is called to move to the next middleware or controller.
    next();
  },
];
