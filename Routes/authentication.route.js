const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/authentication.controller');
const TeacherController = require('../Controllers/teacher.controller');
const AuthValidator = require('../Middlewares/Validation/authentication.validator');
const TeacherValidator = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');

router.post(
  '/register',
  TeacherValidator.insert(),
  validationResult,
  TeacherController.insert
);
router.post(
  '/login',
  AuthValidator.login(),
  validationResult,
  AuthController.login
);
router.get('/logout', AuthController.logout);

module.exports = router;
