const router = require('express').Router();
const ChildValidator = require('../Middlewares/Validation/child.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ChildController = require('../Controllers/child.controller');
const {
  isAdmin,
  isTeacherOrAdmin,
} = require('../Middlewares/authentication.middleware');

router
  .route('/child')
  .get(isTeacherOrAdmin, ChildController.getAll)
  .post(
    isAdmin,
    ChildValidator.insert(),
    validationResult,
    ChildController.insert
  );

router
  .route('/child/:id')
  .get(
    isTeacherOrAdmin,
    ChildValidator.get(),
    validationResult,
    ChildController.getById
  )
  .patch(
    isAdmin,
    ChildValidator.get(),
    ChildValidator.update(),
    validationResult,
    ChildController.update
  )
  .delete(
    isAdmin,
    ChildValidator.get(),
    validationResult,
    ChildController.delete
  );

module.exports = router;
