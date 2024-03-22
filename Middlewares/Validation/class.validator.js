const { body, param } = require('express-validator');

const getValidator = param('id')
  .isInt()
  .withMessage('teacher id should be int');

const insertValidator = [
  body('_id').notEmpty().isInt().withMessage('_id should be integer'),
  body('name')
    .notEmpty()
    .isString()
    .withMessage('fullname should be alphabetical only'),
  body('supervisor')
    .notEmpty()
    .isMongoId()
    .withMessage('teacher id should be integer'),
  body('children')
    .notEmpty()
    .isArray()
    .withMessage('Children should be an array'),
  body('children.*')
    .notEmpty()
    .isInt()
    .withMessage('Each child ID should be a number'),
];

const updateValidator = [
  body('name')
    .optional()
    .notEmpty()
    .isAlpha()
    .withMessage('fullname should be alphabetical only'),
  body('supervisor')
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage('teacher id should be objectID'),
  body('children')
    .optional()
    .notEmpty()
    .isArray()
    .withMessage('Children must be an array'),
  body('children.*')
    .notEmpty()
    .isInt()
    .withMessage('Each child ID must be a number'),
];

module.exports = { getValidator, insertValidator, updateValidator };
