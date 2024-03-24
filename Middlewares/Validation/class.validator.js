const { body, param } = require('express-validator');

class ClassValidator {
  get() {
    return param('id').isInt().withMessage('class id should be int');
  }

  insert() {
    return [
      body('name')
        .notEmpty()
        .isString()
        .withMessage('fullname should be alphabetical only'),
      body('supervisor')
        .notEmpty()
        .isMongoId()
        .withMessage('teacher id should be objectID'),
      body('children')
        .notEmpty()
        .isArray()
        .withMessage('Children should be an array'),
      body('children.*')
        .notEmpty()
        .isInt()
        .withMessage('Each child ID should be a number'),
    ];
  }

  update() {
    return [
      body('name')
        .optional()
        .notEmpty()
        .isString()
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
  }
}

module.exports = new ClassValidator();
