const mongoose = require('mongoose');
const {betweenTwoTimes} = require('../utils/calculateIndex');

const Schema = mongoose.Schema;

const lectureSchema = mongoose.Schema({
  time: String,
  day: Number,
  discipline: {type: Schema.Types.ObjectId, ref: 'Discipline'},
});

lectureSchema.virtual('kek').get(function () {
  const time = this.time;
  const rules = [
    [betweenTwoTimes(time, '08:00', '09:35'), 1],
    [betweenTwoTimes(time, '09:45', '11:20'), 2],
    [betweenTwoTimes(time, '11:30', '13:05'), 3],
    [betweenTwoTimes(time, '13:55', '15:30'), 4],
    [betweenTwoTimes(time, '15:40', '17:15'), 5]
  ];
  for (let oneRule of rules) {
    const [pred, res] = oneRule;
    if (pred) {
      return res;
    }
  }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
