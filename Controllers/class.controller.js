const ClassModel = require('../Models/class.model');
const ChildModel = require('../Models/child.model');
const BaseController = require('./base.controller');

class ClassController extends BaseController {
  constructor() {
    super(ClassModel, 'Class');
  }

  async getChildrenInfo(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findById(id);
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
      res.status(200).json({ class: target.name, childrenInfo });
    } catch (err) {
      next(err);
    }
  }

  async getSupervisorInfo(req, res, next) {
    try {
      const { id } = req.params;
      const target = await ClassModel.findById(id).populate('supervisor');
      if (!target) {
        return res
          .status(404)
          .json({ message: `Class not found with id: ${id}` });
      }
      const { name, supervisor } = target;
      res.status(200).json({ class: name, supervisor });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClassController();
