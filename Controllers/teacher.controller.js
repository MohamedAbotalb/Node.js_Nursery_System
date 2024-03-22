const getAllTeachers = (req, res, next) => {
  res.status(200).json({ data: 'Got all teachers' });
};

const getTeacherById = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `I'm teacher with id ${id}` });
};

const getAllClassSupervisors = (req, res, next) => {
  res.status(200).json({ data: 'Got all class supervisors' });
};

const insertTeacher = (req, res, next) => {
  res.status(201).json({ data: 'Inserted new teacher' });
};

const updateTeacher = (req, res, next) => {
  res.status(201).json({ data: `Updated teacher` });
};

const deleteTeacher = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `Deleted teacher with id ${id}` });
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  getAllClassSupervisors,
  insertTeacher,
  updateTeacher,
  deleteTeacher,
};
