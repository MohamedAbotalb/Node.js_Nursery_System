const TeacherModel = require('../Models/teacher.model');
const ClassModel = require('../Models/class.model');
const BaseController = require('./base.controller');

class TeacherController extends BaseController {
  constructor() {
    super(TeacherModel, 'Teacher');
  }

  async getClassSupervisors(req, res, next) {
    try {
      const target = await ClassModel.find().populate({
        path: 'supervisor',
        select: { _id: 0, fullName: 1 },
      });
      if (!target || target.length === 0) {
        return res.status(404).json({ message: 'No supervisors found' });
      }
      const supervisors = target.map((item) => ({
        class: item.name,
        supervisor: item.supervisor.fullName,
      }));
      res.status(200).json({ data: supervisors });
    } catch (error) {
      next(error);
    }
  }

  async insert(req, res, next) {
    try {
      // check duplicate email
      const { email } = req.body;
      const existingTeacher = await TeacherModel.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }
      const newTeacher = await TeacherModel.create(req.body);
      res
        .status(201)
        .json({ data: newTeacher, message: 'Teacher is inserted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TeacherController();
