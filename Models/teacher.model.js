const { Schema, model } = require('mongoose');

// teacher Data: _id(objectID), fullname,password, email , image (which is string)

const teacherSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: 'teacher',
  },
});

module.exports = model('Teacher', teacherSchema);
