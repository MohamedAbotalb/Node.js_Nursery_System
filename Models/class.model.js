const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    supervisor: {
      type: Number,
      required: true,
      ref: 'Teacher',
    },
    children: [
      {
        type: Number,
        ref: 'Child',
      },
    ],
  },
  { _id: false }
);
classSchema.plugin(AutoIncrement);
module.exports = mongoose.model('Class', classSchema);
