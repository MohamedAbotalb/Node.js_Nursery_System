const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/authentication.controller');
const TeacherController = require('../Controllers/teacher.controller');
const AuthValidator = require('../Middlewares/Validation/authentication.validator');
const TeacherValidator = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const upload = require('../Middlewares/file_upload.middleware');

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

router.patch(
  '/changepassword',
  AuthValidator.changePassword(),
  validationResult,
  AuthController.changePassword
);

module.exports = router;
