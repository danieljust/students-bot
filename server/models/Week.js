const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
  number: Number
});

weekSchema.methods.getOrder = function () {
  const order = this.number % 2 == 0;
  return order ? ('even') : ('odd');
};

weekSchema.methods.getNumber = function () {
    return this.number;
}

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
