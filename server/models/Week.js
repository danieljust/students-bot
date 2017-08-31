const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
  number: Number
});

weekSchema.methods.getOrder = function () {
  const order = (this.number & 1);
  return order ? ('odd') : ('even');
};

weekSchema.methods.getNumber = function () {
    return this.number;
};

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
