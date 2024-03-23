const TeacherModel = require('../Models/teacher.model');
const ClassModel = require('../Models/class.model');

class TeacherController {
  async getAll(req, res, next) {
    try {
      const teachers = await TeacherModel.find();
      res.status(200).json({ data: teachers });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const target = await TeacherModel.findOne({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Teacher is not found with id: ${id}` });
      }
      res.status(200).json({ data: target });
    } catch (error) {
      next(error);
    }
  }

  async getClassSupervisors(req, res, next) {
    try {
      const supervisors = await ClassModel.find().populate(
        'supervisor',
        'fullName'
      );
      if (!supervisors || supervisors.length === 0) {
        return res.status(404).json({ message: 'No supervisors found' });
      }
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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const target = await TeacherModel.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (!target) {
        return res
          .status(404)
          .json({ message: `Teacher is not found with id: ${id}` });
      }
      res.status(200).json({ data: target, message: 'Teacher is updated' });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const target = await TeacherModel.findOneAndDelete({ _id: id });
      if (!target) {
        return res
          .status(404)
          .json({ message: `Teacher is not found with id: ${id}` });
      }
      res.status(200).json({ message: `Deleted teacher with id ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TeacherController();
