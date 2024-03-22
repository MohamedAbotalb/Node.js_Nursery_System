const { body, param } = require('express-validator');

const getValidator = param('id')
  .isMongoId()
  .notEmpty()
  .withMessage('teacher id should be int');

const insertValidator = [
  body('_id').isMongoId().notEmpty().withMessage('_id should be objectID'),
  body('fullName')
    .isAlpha()
    .notEmpty()
    .withMessage('fullname should be alphabetical only'),
  body('password')
    .notEmpty()
    .isStrongPassword()
    .isLength({ min: 6 })
    .withMessage('password should be more than 6 digits'),
  body('email').notEmpty().isEmail().withMessage('Email should be valid value'),
  body('image').notEmpty().isString().withMessage('Image should be string'),
];

const updateValidator = [
  body('fullName')
    .optional()
    .notEmpty()
    .isAlpha()
    .withMessage('fullname should be alphabetical only'),
  body('password')
    .optional()
    .notEmpty()
    .isStrongPassword()
    .isLength({ min: 6 })
    .withMessage('password should be more than 6 digits'),
  body('email')
    .optional()
    .notEmpty()
    .isEmail()
    .withMessage('Email should be valid value'),
  body('image')
    .optional()
    .notEmpty()
    .isString()
    .withMessage('Image should be string'),
];

module.exports = { getValidator, insertValidator, updateValidator };
