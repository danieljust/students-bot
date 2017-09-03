const Week = require('../../models/Week');

module.exports = {
  create: info => Week({number: info.number}).save(),
  save: week => week.save(),
  findOneById: id => Week.findOne({_id: id})
};
