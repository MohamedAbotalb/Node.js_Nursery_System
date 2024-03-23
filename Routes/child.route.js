const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/child.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ChildController = require('../Controllers/child.controller');
const {
  isAdmin,
  isTeacherOrAdmin,
} = require('../Middlewares/authentication.middleware');

router
  .route('/child')
  .get(isTeacherOrAdmin, ChildController.getAll)
  .post(isAdmin, insertValidator, validationResult, ChildController.insert);

router
  .route('/child/:id')
  .get(
    isTeacherOrAdmin,
    getValidator,
    validationResult,
    ChildController.getById
  )
  .patch(
    isAdmin,
    getValidator,
    updateValidator,
    validationResult,
    ChildController.update
  )
  .delete(isAdmin, getValidator, validationResult, ChildController.delete);

module.exports = router;
