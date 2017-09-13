const models = require('../../models2');

module.exports = {
  create: ({time, day}) => models
    .lecture
    .build(
      {
        time: time,
        day: day
      })
    .save(),
  findOneById: id => models
    .lecture
    .findOne({where: {id: id}}),
  deleteOneById: id => models.lecture.destroy({where: {id: id}}),
  deleteAll: id => models.lecture.destroy({where: {}}),
};
