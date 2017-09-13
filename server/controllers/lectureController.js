const lectureService = require('../dao/mongo/lectureService');

module.exports = {
  show: id => lectureService.findOneById(id),
  create: ({time, day}) => lectureService.create({time, day}),
  update: (id, lectureInfo) => lectureService.update(id, lectureInfo),
  deleteOneById: id => lectureService.deleteOneById(id),
  addWeek: ({lecture, week}) => lectureService.addWeek({lecture, week}),
  addDiscipline: ({lecture, discipline}) => lectureService.addDiscipline({lecture, discipline})
};
