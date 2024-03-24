const router = require('express').Router();
const TeacherValidator = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const TeacherController = require('../Controllers/teacher.controller');
const { isAdmin } = require('../Middlewares/authentication.middleware');

router
  .route('/teachers')
  .get(isAdmin, TeacherController.getAll)
  .post(
    isAdmin,
    TeacherValidator.insert(),
    validationResult,
    TeacherController.insert
  );

router.get(
  '/teachers/supervisors',
  isAdmin,
  TeacherController.getClassSupervisors
);
router
  .route('/teachers/:id')
  .get(
    isAdmin,
    TeacherValidator.get(),
    validationResult,
    TeacherController.getById
  )
  .patch(
    isAdmin,
    TeacherValidator.get(),
    TeacherValidator.update(),
    validationResult,
    TeacherController.update
  )
  .delete(
    isAdmin,
    TeacherValidator.get(),
    validationResult,
    TeacherController.delete
  );

module.exports = router;
