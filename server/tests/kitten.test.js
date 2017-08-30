const mongoose = require('mongoose');
const Kitten = require('../models/Kitten');


beforeAll(() => {
  return mongoose
    .connect('mongodb://localhost/mydb');
});

afterEach(() => {
  return Kitten.remove({});
});

describe('kitten tests', () => {
  it('should add kitten with name snowball', () => {
    const snowball = new Kitten({name: 'snowball'});
    return snowball
      .save()
      .then(kitten => Kitten.find({_id: kitten._id}))
      .then(kittens => {
        expect(kittens[0].name).toBe('snowball');
      });
  });
});
afterAll(() => {
  return mongoose.connection.close();
});
