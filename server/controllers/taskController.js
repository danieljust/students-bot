const taskService = require('../dao/mongo/taskService');
const moment = require('moment');

module.exports = {
  show: id => taskService.findOneById(id),
  create: ({deadline, desc}) =>
    taskService.create({
      deadline: moment(deadline, 'DD-MM-YYYY'),
      description: desc
    })
};
