const cond = require('lodash.cond');
const constant = require('lodash.constant');

function betweenTwoTimes(myTime, leftTime, rightTime) {
  return myTime > leftTime && myTime < rightTime;
}


const calculateIndex = myTime => {
  const time = this.time || myTime;
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
  // return cond([
  //   [betweenTwoTimes(time, '08:00', '09:35'), 1],
  //   [betweenTwoTimes(time, '09:45', '11:20'), 2],
  //   [betweenTwoTimes(time, '11:30', '13:05'), 3],
  //   [betweenTwoTimes(time, '13:55', '15:30'), 4],
  //   [betweenTwoTimes(time, '15:40', '17:15'), 5]
  // ]);
};

module.exports = {
  calculateIndex,
  betweenTwoTimes
};
