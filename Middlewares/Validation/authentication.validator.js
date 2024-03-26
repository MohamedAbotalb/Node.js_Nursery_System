const { body } = require('express-validator');

class AuthValidator {
  login() {
    return [
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email should be valid value'),
      body('password')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('password should be more than 6 digits'),
    ];
  }

  changePassword() {
    return [
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email should be valid value'),
      body('oldPassword')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('Old password should be more than 6 digits'),
      body('newPassword')
        .notEmpty()
        .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('New password should be more than 6 digits'),
    ];
  }
}

module.exports = new AuthValidator();
