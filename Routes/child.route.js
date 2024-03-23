const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/child.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const ChildController = require('../Controllers/child.controller');

router
  .route('/child')
  .get(ChildController.getAll)
  .post(insertValidator, validationResult, ChildController.insert);

router
  .route('/child/:id')
  .get(getValidator, validationResult, ChildController.getById)
  .patch(
    getValidator,
    updateValidator,
    validationResult,
    ChildController.update
  )
  .delete(getValidator, validationResult, ChildController.delete);

module.exports = router;
