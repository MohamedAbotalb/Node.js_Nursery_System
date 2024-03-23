const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

const addressSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const childSchema = mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['PreKG', 'KG1', 'KG2'],
  },
  role: {
    type: String,
    default: 'child',
  },
  address: addressSchema,
});

childSchema.plugin(autoIncrement.plugin, {
  model: 'Child',
  startAt: 1,
  incrementBy: 1,
  field: '_id',
});
module.exports = mongoose.model('Child', childSchema);
