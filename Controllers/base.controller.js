const hashingPassword = require('../utils/hash_password.util');

class BaseController {
  constructor(model, modelName) {
    this.Model = model;
    this.modelName = modelName;

    this.getById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const target = await this.Model.findById(id);
        if (!target) {
          return res
            .status(404)
            .json({ message: `${this.modelName} is not found with id: ${id}` });
        }
        res.status(200).json({ data: target });
      } catch (error) {
        next(error);
      }
    };

    this.getAll = async (req, res, next) => {
      try {
        const target = await this.Model.find();
        res.status(200).json({ data: target });
      } catch (error) {
        next(error);
      }
    };

    this.insert = async (req, res, next) => {
      try {
        const newItem = await this.Model.create(req.body);
        res
          .status(201)
          .json({ data: newItem, message: `${this.modelName} is inserted` });
      } catch (error) {
        next(error);
      }
    };

    this.update = async (req, res, next) => {
      try {
        const { id } = req.params;
        const updates = req.body;

        // Check if the request includes a password update (for teacher)
        if (updates.password) {
          updates.password = await hashingPassword(updates.password);
        }
        const target = await this.Model.findByIdAndUpdate(id, updates, {
          new: true,
        });
        if (!target) {
          return res
            .status(404)
            .json({ message: `${this.modelName} is not found with id: ${id}` });
        }
        res
          .status(200)
          .json({ data: target, message: `${this.modelName} is updated` });
      } catch (error) {
        next(error);
      }
    };

    this.delete = async (req, res, next) => {
      const { id } = req.params;
      try {
        const target = await this.Model.findByIdAndDelete(id);
        if (!target) {
          return res
            .status(404)
            .json({ message: `${this.modelName} is not found with id: ${id}` });
        }
        res
          .status(200)
          .json({ message: `Deleted ${this.modelName} with id ${id}` });
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = BaseController;
