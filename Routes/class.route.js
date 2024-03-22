const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/class.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const {
  getAllClasses,
  getClassById,
  getClassChildrenInfo,
  getClassSupervisorInfo,
  insertClass,
  updateClass,
  deleteClass,
} = require('../Controllers/class.controller');

router
  .route('/class')
  .get(getAllClasses)
  .post(insertValidator, validationResult, insertClass);

router
  .route('/class/:id')
  .get(getValidator, validationResult, getClassById)
  .patch(getValidator, updateValidator, validationResult, updateClass)
  .delete(getValidator, validationResult, deleteClass);

router.get(
  '/class/child/:id',
  getValidator,
  validationResult,
  getClassChildrenInfo
);

router.get(
  '/class/teacher/:id',
  getValidator,
  validationResult,
  getClassSupervisorInfo
);

module.exports = router;
