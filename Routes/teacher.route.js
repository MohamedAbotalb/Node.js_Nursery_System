const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const TeacherController = require('../Controllers/teacher.controller');
const { isAdmin } = require('../Middlewares/authentication.middleware');

router
  .route('/teachers')
  .get(isAdmin, TeacherController.getAll)
  .post(isAdmin, insertValidator, validationResult, TeacherController.insert);

router.get(
  '/teachers/supervisors',
  isAdmin,
  TeacherController.getClassSupervisors
);
router
  .route('/teachers/:id')
  .get(isAdmin, getValidator, validationResult, TeacherController.getById)
  .patch(
    isAdmin,
    getValidator,
    updateValidator,
    validationResult,
    TeacherController.update
  )
  .delete(isAdmin, getValidator, validationResult, TeacherController.delete);

module.exports = router;
