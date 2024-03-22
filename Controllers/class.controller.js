const getAllClasses = (req, res, next) => {
  res.status(200).json({ data: 'Got all classes' });
};

const getClassById = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `I'm class with id ${id}` });
};

const getClassChildrenInfo = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `Got class children info with id ${id}` });
};

const getClassSupervisorInfo = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `Got class supervisor info with id ${id}` });
};

const insertClass = (req, res, next) => {
  res.status(201).json({ data: 'Inserted new class' });
};

const updateClass = (req, res, next) => {
  res.status(201).json({ data: `Updated class` });
};

const deleteClass = (req, res, next) => {
  res.status(200).json({ data: `Deleted class` });
};

module.exports = {
  getAllClasses,
  getClassById,
  getClassChildrenInfo,
  getClassSupervisorInfo,
  insertClass,
  updateClass,
  deleteClass,
};
