const router = require('express').Router();
const {
  getValidator,
  insertValidator,
  updateValidator,
} = require('../Middlewares/Validation/teacher.validator');
const validationResult = require('../Middlewares/Validation/ValidationResult');
const {
  getAllTeachers,
  getTeacherById,
  getAllClassSupervisors,
  insertTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../Controllers/teacher.controller');

router
  .route('/teachers')
  .get(getAllTeachers)
  .post(insertValidator, validationResult, insertTeacher);

router.get('/teachers/supervisors', getAllClassSupervisors);
router
  .route('/teachers/:id')
  .get(getValidator, validationResult, getTeacherById)
  .patch(getValidator, updateValidator, validationResult, updateTeacher)
  .delete(getValidator, validationResult, deleteTeacher);

module.exports = router;
