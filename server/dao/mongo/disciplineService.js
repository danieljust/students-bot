const P = require('bluebird');
const Discipline = require('../../models/Discipline');

module.exports = {
  create: info => Discipline({
    teacher: info.teacher,
    name: info.name
  })
    .save(),
  addLecture: (discipline, lecture) => {
    discipline.lectures.push(lecture);
    lecture.discipline = discipline._id;
    return P.props({
      discipline: discipline.save(),
      lecture: lecture.save()
    });
  },
  save: discipline => discipline.save(),
  findOneById: id => Discipline.findOne({ _id: id })
};
