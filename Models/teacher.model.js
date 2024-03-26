const { Schema, model } = require('mongoose');
const hashingPassword = require('../utils/hash_password.util');

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

// Encrypt the password before saving the teacher data
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hashingPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model('Teacher', teacherSchema);
