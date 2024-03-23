const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

const childSchema = mongoose.Schema(
  {
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
  },
  { _id: false }
);

childSchema.plugin(AutoIncrement);
module.exports = mongoose.model('Child', childSchema);
