const mongoose = require('mongoose');

const kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  return greeting;
};

const Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;
