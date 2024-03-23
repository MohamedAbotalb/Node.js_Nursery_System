const ClassModel = require('../Models/class.model');
const ChildModel = require('../Models/child.model');

class ClassController {
  async getAll(req, res, next) {
    try {
      const classes = await ClassModel.find();
      res.status(200).json({ data: classes });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findOne({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Class not found with id: ${id}` });
      }
      res.status(200).json({ data: target });
    } catch (error) {
      next(error);
    }
  }

  async getChildrenInfo(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findOne({ _id: id });
      if (!target) {
        return res.status(404).json({ message: 'Class not found' });
      }
      const childrenInfo = await ChildModel.find({
        _id: { $in: target.children },
      });

      if (!childrenInfo || childrenInfo.length === 0) {
        return res
          .status(404)
          .json({ message: 'No children found for this class' });
      }
      res.status(200).json({ name: target.name, childrenInfo });
    } catch (err) {
      next(err);
    }
  }

  async getSupervisorInfo(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findOne({ _id: id }).populate(
        'supervisor'
      );
      if (!target) {
        return res
          .status(404)
          .json({ message: `Class not found with id: ${id}` });
      }
      res
        .status(200)
        .json({ class: target.name, supervisor: target.supervisor });
    } catch (error) {
      next(error);
    }
  }

  async insert(req, res, next) {
    try {
      const newClass = await ClassModel.create(req.body);
      res.status(201).json({ data: newClass, message: 'Class inserted' });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Class not found with id: ${id}` });
      }
      res.status(200).json({ data: target });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findOneAndDelete({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Class not found with id: ${id}` });
      }
      res.status(200).json({ message: `Class deleted with id ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClassController();
