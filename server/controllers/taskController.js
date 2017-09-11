const taskService = require('../dao/mongo/taskService');
const moment = require('moment');

module.exports = {
  show: (id) => taskService.findOneById(id),
  create: ({dline, desc}) => taskService.create({
    deadline: moment(dline, 'MM-DD-YYYY'),
    description: desc
  })
};
