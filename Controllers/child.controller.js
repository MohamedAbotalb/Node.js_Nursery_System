const ChildModel = require('../Models/child.model');

class ChildController {
  async getAll(req, res, next) {
    try {
      const children = await ChildModel.find();
      res.status(200).json({ data: children });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ChildModel.findOne({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Child is not found with id: ${id}` });
      }
      res.status(200).json({ data: target });
    } catch (error) {
      next(error);
    }
  }

  async insert(req, res, next) {
    try {
      const newChild = await ChildModel.create(req.body);
      res.status(201).json({ data: newChild, message: 'Child is inserted' });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ChildModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Child is not found with id: ${id}` });
      }
      res.status(200).json({ data: target, message: 'Child is updated' });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const target = await ChildModel.findOneAndDelete({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Child is not found with id: ${id}` });
      }
      res.status(200).json({ message: `Deleted child with id ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChildController();
