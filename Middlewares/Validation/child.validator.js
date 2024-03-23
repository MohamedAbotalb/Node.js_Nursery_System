const { body, param } = require('express-validator');

const getValidator = param('id')
  .isInt()
  .withMessage('teacher id should be int');

const insertValidator = [
  body('fullName')
    .notEmpty()
    .isString()
    .withMessage('fullname should be alphabetical only'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive integer')
    .custom((value) => {
      if (value >= 8) {
        throw new Error('Child age should be less than 8');
      }
      return true;
    }),
  body('level')
    .notEmpty()
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage('Child level should be one of these values [PreKG, KG1, KG2]'),
  body('address').custom((value) => {
    if (typeof value !== 'object') {
      throw new Error('Address must be an object');
    }
    if (
      !value.hasOwnProperty('city') ||
      !value.hasOwnProperty('street') ||
      !value.hasOwnProperty('building')
    ) {
      throw new Error('Address must contain city, street, and building');
    }
    return true;
  }),
];

const updateValidator = [
  body('fullName')
    .optional()
    .isString()
    .withMessage('fullname should be alphabetical only'),
  body('age')
    .optional()
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive integer')
    .custom((value) => {
      if (value >= 8) {
        throw new Error('Child age should be less than 8');
      }
      return true;
    }),
  body('level')
    .optional()
    .notEmpty()
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage('Child level should be one of these values [PreKG, KG1, KG2]'),
  body('address')
    .optional()
    .custom((value) => {
      if (typeof value !== 'object') {
        throw new Error('Address must be an object');
      }
      if (
        !value.hasOwnProperty('city') ||
        !value.hasOwnProperty('street') ||
        !value.hasOwnProperty('building')
      ) {
        throw new Error('Address must contain city, street, and building');
      }
      return true;
    }),
];

module.exports = { getValidator, insertValidator, updateValidator };
