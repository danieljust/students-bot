const mongoose = require('mongoose');
const { calculateIndex } = require('../utils/calculateIndex');

const Schema = mongoose.Schema;

const lectureSchema = mongoose.Schema({
  time: String,
  day: Number,
  discipline: { type: Schema.Types.ObjectId, ref: 'Discipline' },
});

lectureSchema.virtual('index').get(function () {
  return calculateIndex(this.time);
});
lectureSchema.set('toObject', { virtuals: true });
lectureSchema.set('toJSON', { virtuals: true });
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
