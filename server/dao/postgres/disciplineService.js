const models = require('../../models');

module.exports = {
  create: ({teacher, name}) => models
    .discipline
    .build(
      {
        teacher: teacher,
        name: name
      })
    .save(),
  findAll: () => models.discipline.findAll(),
  findOneById: id => models
    .discipline
    .findOne({where: {id: id}}),
  deleteOneById: id => models.discipline.destroy({where: {id: id}}),
  deleteAll: id => models.discipline.destroy({where: {}}),
  update: ({discipline, info}) => discipline.update(info)
};
