const { body, param } = require('express-validator');

class ChildValidator {
  get() {
    return param('id').isInt().withMessage('child id should be int');
  }

  insert() {
    return [
      body('fullName')
        .notEmpty()
        .withMessage('Child name is required')
        .isLength({ min: 3 })
        .withMessage('Child name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Child name should contain only alphabetical characters'
            );
          }
          return true;
        }),
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
        .withMessage(
          'Child level should be one of these values [PreKG, KG1, KG2]'
        ),
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
  }

  update() {
    return [
      body('fullName')
        .optional()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Child name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Child name should contain only alphabetical characters'
            );
          }
          return true;
        }),
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
        .withMessage(
          'Child level should be one of these values [PreKG, KG1, KG2]'
        ),
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
  }
}

module.exports = new ChildValidator();
