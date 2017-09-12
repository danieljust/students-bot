const Lecture = require('../../models/Lecture');

module.exports = {
  create: info => Lecture({
    time: info.time,
    day: info.day
  })
    .save().then(result => result),
  addWeek: ({lecture, week}) => {
    lecture.week = week._id;
    return lecture.save();
  },
  save: lecture => lecture.save(),
  findOneById: id => Lecture.findOne({_id: id}),
  update: (id, toUpdateInfo) => Lecture.update({_id: id}, toUpdateInfo),
  deleteOneById: id => Lecture.deleteOne({_id: id}),
  addDiscipline: ({lecture, discipline}) => {
    lecture.discipline = discipline._id;
    return lecture.save();
  }
};
