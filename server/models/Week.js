const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
  number: Number,
});

weekSchema.virtual('order').get(function () {
  // eslint-disable-next-line no-bitwise
  return (this.number & 1) ? 'odd' : 'even';
});
const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
