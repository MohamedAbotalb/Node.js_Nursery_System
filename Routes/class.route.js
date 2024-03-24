const router = require('express').Router();
const ClassValidator = require('../Middlewares/Validation/class.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ClassController = require('../Controllers/class.controller');
const { isAdmin } = require('../Middlewares/authentication.middleware');

router
  .route('/class')
  .get(isAdmin, ClassController.getAll)
  .post(
    isAdmin,
    ClassValidator.insert(),
    validationResult,
    ClassController.insert
  );

router
  .route('/class/:id')
  .get(isAdmin, ClassValidator.get(), validationResult, ClassController.getById)
  .patch(
    isAdmin,
    ClassValidator.get(),
    ClassValidator.update(),
    validationResult,
    ClassController.update
  )
  .delete(
    isAdmin,
    ClassValidator.get(),
    validationResult,
    ClassController.delete
  );

router.get(
  '/class/child/:id',
  isAdmin,
  ClassValidator.get(),
  validationResult,
  ClassController.getChildrenInfo
);

router.get(
  '/class/teacher/:id',
  isAdmin,
  ClassValidator.get(),
  validationResult,
  ClassController.getSupervisorInfo
);

module.exports = router;
