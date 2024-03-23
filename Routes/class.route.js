const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/class.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ClassController = require('../Controllers/class.controller');
const { isAdmin } = require('../Middlewares/authentication.middleware');

router
  .route('/class')
  .get(isAdmin, ClassController.getAll)
  .post(isAdmin, insertValidator, validationResult, ClassController.insert);

router
  .route('/class/:id')
  .get(isAdmin, getValidator, validationResult, ClassController.getById)
  .patch(
    isAdmin,
    getValidator,
    updateValidator,
    validationResult,
    ClassController.update
  )
  .delete(isAdmin, getValidator, validationResult, ClassController.delete);

router.get(
  '/class/child/:id',
  isAdmin,
  getValidator,
  validationResult,
  ClassController.getChildrenInfo
);

router.get(
  '/class/teacher/:id',
  isAdmin,
  getValidator,
  validationResult,
  ClassController.getSupervisorInfo
);

module.exports = router;
