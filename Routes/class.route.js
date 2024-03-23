const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/class.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ClassController = require('../Controllers/class.controller');

router
  .route('/class')
  .get(ClassController.getAll)
  .post(insertValidator, validationResult, ClassController.insert);

router
  .route('/class/:id')
  .get(getValidator, validationResult, ClassController.getById)
  .patch(
    getValidator,
    updateValidator,
    validationResult,
    ClassController.update
  )
  .delete(getValidator, validationResult, ClassController.delete);

router.get(
  '/class/child/:id',
  getValidator,
  validationResult,
  ClassController.getChildrenInfo
);

router.get(
  '/class/teacher/:id',
  getValidator,
  validationResult,
  ClassController.getSupervisorInfo
);

module.exports = router;
