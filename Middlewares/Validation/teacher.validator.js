const { body, param } = require('express-validator');

class TeacherValidator {
  get() {
    return param('id')
      .notEmpty()
      .isMongoId()
      .withMessage('teacher id should be objectID');
  }

  insert() {
    return [
      body('fullName')
        .notEmpty()
        .withMessage('Teacher name is required')
        .isLength({ min: 3 })
        .withMessage('Teacher name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Teacher name should contain only alphabetical characters'
            );
          }
          return true;
        }),
      body('password')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('password should be more than 6 digits'),
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email should be valid value'),
      body('image').notEmpty().isString().withMessage('Image should be string'),
    ];
  }

  update() {
    return [
      body('fullName')
        .optional()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Teacher name should be more than 3 characters')
        .custom((value) => {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            throw new Error(
              'Teacher name should contain only alphabetical characters'
            );
          }
          return true;
        }),
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
  }
}

module.exports = new TeacherValidator();
