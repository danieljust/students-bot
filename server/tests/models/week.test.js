const mongoose = require('mongoose');
const Week = require('../../models/Week');
const weekService = require('../../dao/mongo/weekService');

beforeAll(() => mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
}));

beforeEach(() => Week.remove({}));

afterEach(() => Week.remove({}));

afterAll(() => mongoose.connection.close());

describe('week model tests', () => {
  it('should return odd value', () => {
    return weekService.create({number: 1})
      .then(week => weekService.findOneById(week._id))
      .then(week => {
        expect(week.order).toBe('odd');
      });
  });

  it('should return even value', () => {
    weekService.create({number: 2})
      .then(week => weekService.findOneById(week._id))
      .then(week => {
        expect(week.order).toBe('even');
      });
  });

  it('should return number of a week', () => {
    weekService.create({number: 10})
      .then(week => weekService.findOneById(week._id))
      .then(week => {
        expect(week.number).toBe(10);
      });
  });
});
