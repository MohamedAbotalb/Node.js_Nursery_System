const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/child.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const {
  getAllChildren,
  getChildById,
  insertChild,
  updateChild,
  deleteChild,
} = require('../Controllers/child.controller');

router
  .route('/child')
  .get(getAllChildren)
  .post(insertValidator, validationResult, insertChild);

router
  .route('/child/:id')
  .get(getValidator, validationResult, getChildById)
  .patch(getValidator, updateValidator, validationResult, updateChild)
  .delete(getValidator, validationResult, deleteChild);

module.exports = router;
