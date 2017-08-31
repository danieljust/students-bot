const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
  time: String,
  day: Number,
});

lectureSchema.methods.getTime = function () {
  return this.time;
};

lectureSchema.methods.getDay = function () {
  return this.day;
};

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
