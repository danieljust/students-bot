const cond = require('lodash.cond');
const constant = require('lodash.constant');
const stubTrue = require('lodash.stubtrue');

function betweenTwoTimes(myTime, leftTime, rightTime) {
  return myTime >= leftTime && myTime <= rightTime;
}

const calculateIndex = (myTime) => {
  const time = this.time || myTime;
  const a = cond([
    [condTime => betweenTwoTimes(condTime, '08:00', '09:35'), constant(1)],
    [condTime => betweenTwoTimes(condTime, '09:45', '11:20'), constant(2)],
    [condTime => betweenTwoTimes(condTime, '11:30', '13:05'), constant(3)],
    [condTime => betweenTwoTimes(condTime, '13:55', '15:30'), constant(4)],
    [condTime => betweenTwoTimes(condTime, '15:40', '17:15'), constant(5)],
    [stubTrue, constant('break')],
  ]);
  return a(time);
};

module.exports = {
  calculateIndex,
  betweenTwoTimes,
};
