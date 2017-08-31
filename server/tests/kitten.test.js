/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Kitten = require('../models/Kitten');


beforeAll(() => mongoose
  .connect('mongodb://localhost/mydb'));

afterEach(() => Kitten.remove({}));

describe('kitten tests', () => {
  it('should add kitten with name snowball', () => {
    const snowball = new Kitten({name: 'snowball'});
    return snowball
      .save()
      .then(kitten => Kitten.find({_id: kitten._id}))
      .then((kittens) => {
        expect(kittens[0].name).toBe('snowball');
      });
  });
  it('should check that kitten meowing his name', () => {
    const snowball = new Kitten({name: 'snowball'});
    expect(snowball.speak()).toBe('Meow name is snowball');
  });
});
afterAll(() => mongoose.connection.close());
