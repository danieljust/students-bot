const lectureService = require('../dao/mongo/lectureService');

module.exports = {
  show: id => lectureService.findOneById(id),
  create: ({time, day}) => lectureService.create({time, day}),
  update: lectureInfo => lectureService.update(lectureInfo),
  deleteOneById: lectureInfo => lectureService.deleteOneById(lectureInfo),
  addWeek: ({lecture, week}) => lectureService.addWeek({lecture, week}),
  addDiscipline: ({lecture, discipline}) => lectureService.addDiscipline({lecture, discipline})
};
