const { body, param } = require('express-validator');

class ClassValidator {
  get() {
    return param('id').isInt().withMessage('class id should be int');
  }

  insert() {
    return [
      body('name')
        .notEmpty()
        .withMessage('Class name is required')
        .isLength({ min: 3 })
        .withMessage('Class name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Class name should contain only alphabetical characters'
            );
          }
          return true;
        }),
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
        .isLength({ min: 3 })
        .withMessage('Class name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Class name should contain only alphabetical characters'
            );
          }
          return true;
        }),
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
