const { body, param } = require('express-validator');

const getValidator = param('id')
  .notEmpty()
  .isMongoId()
  .withMessage('teacher id should be objectID');

const insertValidator = [
  body('fullName')
    .isString()
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
    .isString()
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
