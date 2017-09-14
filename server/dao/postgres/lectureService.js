const models = require('../../models');

module.exports = {
  create: ({time, day}) => models
    .lecture
    .build(
      {
        time: time,
        day: day
      })
    .save(),
  findAll: () => models.lecture.findAll(),
  findOneById: id => models
    .lecture
    .findOne({where: {id: id}}),
  deleteOneById: id => models.lecture.destroy({where: {id: id}}),
  deleteAll: id => models.lecture.destroy({where: {}}),
  addWeek: ({lecture, week}) => lecture.setWeek(week),
  addDiscipline: ({lecture, discipline}) => lecture.setDiscipline(discipline),
  update: ({lecture, info}) => lecture.update(info)
};
