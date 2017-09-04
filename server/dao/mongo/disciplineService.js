const Discipline = require('../../models/Discipline');

module.exports = {
  create: info => Discipline({
    teacher: info.teacher,
    name: info.name,
    lectures: info.lectures,
  })
    .save(),
  save: discipline => discipline.save(),
  findOneById: id => Discipline.findOne({ _id: id }),
};
