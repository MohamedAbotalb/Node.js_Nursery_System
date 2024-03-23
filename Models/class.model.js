const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

const classSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher',
  },
  children: [{ type: Number, required: true, ref: 'Child' }],
});

classSchema.plugin(autoIncrement.plugin, {
  model: 'Class',
  startAt: 1,
  incrementBy: 1,
  field: '_id',
});

module.exports = mongoose.model('Class', classSchema);
