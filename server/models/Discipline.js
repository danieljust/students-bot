const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const disciplineSchema = mongoose.Schema({
  teacher: String,
  name: String,
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

module.exports = Discipline;
