const mongoose = require('mongoose');
const cond = require('lodash.cond');

const Schema = mongoose.Schema;

function betweenTwoTimes(myTime, leftTime, rightTime) {
  return myTime > leftTime && myTime < rightTime;
}

const calculateIndex = function () {
  return cond([
    [betweenTwoTimes(this.time, '08:00', '09:35')], [() => 1],
    [betweenTwoTimes(this.time, '09:45', '11:20')], [() => 2],
    [betweenTwoTimes(this.time, '11:30', '13:05')], [() => 3],
    [betweenTwoTimes(this.time, '13:55', '15:30')], [() => 4],
    [betweenTwoTimes(this.time, '15:40', '17:15')], [() => 5],
  ]);
};


const lectureSchema = mongoose.Schema({
  time: String,
  day: Number,
  discipline: { type: Schema.Types.ObjectId, ref: 'Discipline' },
});

lectureSchema.virtual('index').get(calculateIndex());

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
