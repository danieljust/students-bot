const lectureService = require('../dao/postgres/lectureService');

module.exports = {
  show: id => lectureService.findOneById(id),
  showAll: () => lectureService.findAll(),
  create: ({time, day}) => lectureService.create({time, day}),
  update: ({lecture, info}) => lectureService.update({lecture, info}),
  deleteOneById: id => lectureService.deleteOneById(id),
  deleteAll: () => lectureService.deleteAll(),
  addWeek: ({lecture, week}) => lectureService.addWeek({lecture, week}),

  addDiscipline: ({lecture, discipline}) => lectureService.addDiscipline({lecture, discipline})
};
