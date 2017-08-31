const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const disciplineSchema = mongoose.Schema({
  teacher: String,
  name: String,
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
});

disciplineSchema.methods.getTeacher = function () {
  return this.teacher;
};

disciplineSchema.methods.getName = function () {
  return this.name;
};

disciplineSchema.methods.getLectures = function () {
  return this.lectures;
};

const Discipline = mongoose.model('Discipline', disciplineSchema);

module.exports = Discipline;
