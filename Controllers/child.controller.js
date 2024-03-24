const ChildModel = require('../Models/child.model');
const BaseController = require('./base.controller');

class ChildController extends BaseController {
  constructor() {
    super(ChildModel, 'Child');
  }
}

module.exports = new ChildController();
