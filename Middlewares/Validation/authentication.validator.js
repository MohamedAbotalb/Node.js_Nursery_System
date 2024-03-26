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
}

module.exports = new AuthValidator();
