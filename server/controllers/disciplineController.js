const disciplineService = require('../dao/postgres/disciplineService');

module.exports = {
  show: id => disciplineService.findOneById(id),
  showAll: () => disciplineService.findAll(),
  create: ({teacher, name}) => disciplineService.create({teacher, name}),
  update: ({discipline, info}) => disciplineService.update({discipline, info}),
  deleteOneById: id => disciplineService.deleteOneById(id),
  deleteAll: () => disciplineService.deleteAll()
};
