const { Schema, model } = require('mongoose');

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
    enum: ['admin', 'teacher'],
  },
});

module.exports = model('Teacher', teacherSchema);
