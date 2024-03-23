const { Schema, model } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Class Data: _id(Number), name, supervisor (teacher id number), children which is array of children ids

const classSchema = Schema(
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
module.exports = model('Class', classSchema);
