const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weekSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  order: String,
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
