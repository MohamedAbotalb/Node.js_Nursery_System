const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const TeacherController = require('../Controllers/teacher.controller');

router
  .route('/teachers')
  .get(TeacherController.getAll)
  .post(insertValidator, validationResult, TeacherController.insert);

router.get('/teachers/supervisors', TeacherController.getClassSupervisors);
router
  .route('/teachers/:id')
  .get(getValidator, validationResult, TeacherController.getById)
  .patch(
    getValidator,
    updateValidator,
    validationResult,
    TeacherController.update
  )
  .delete(getValidator, validationResult, TeacherController.delete);

module.exports = router;
