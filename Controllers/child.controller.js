const getAllChildren = (req, res, next) => {
  res.status(200).json({ data: "Got all children" });
};

const getChildById = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ data: `I'm child with id ${id}` });
};

const insertChild = (req, res, next) => {
  res.status(201).json({ data: 'Inserted new child' });
};

const updateChild = (req, res, next) => {
  res.status(201).json({ data: `Updated child` });
};

const deleteChild = (req, res, next) => {
  res.status(200).json({ data: `Deleted child` });
};

module.exports = {
  getAllChildren,
  getChildById,
  insertChild,
  updateChild,
  deleteChild,
};
