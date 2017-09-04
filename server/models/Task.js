const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = Schema({
  deadline: Date,
  description: String,
  discipline: [{type: Schema.Types.ObjectId, ref: 'Discipline'}],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
