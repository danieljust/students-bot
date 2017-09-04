const Lecture = require('../../models/Lecture');

module.exports = {
  create: info => Lecture({
    time: info.time,
    day: info.day,
  })
    .save(),
  addWeek: (lecture, week) => {
    lecture.week = week._id;
    return lecture.save();
  },
  save: lecture => lecture.save(),
  findOneById: id => Lecture.findOne({ _id: id }),
};
