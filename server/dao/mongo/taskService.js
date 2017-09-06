const Task = require('../../models/Task');

module.exports = {
  create: ({ deadline, description }) =>
    Task({ deadline, description }).save(),
  save: task => task.save(),
  findOneById: id => Task.findOne({ _id: id }),
};
