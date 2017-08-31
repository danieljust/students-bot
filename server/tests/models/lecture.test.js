const mongoose = require('mongoose');
const Lecture = require('../../models/Lecture');

beforeAll(() => mongoose
  .connect('mongodb://localhost/test'));

beforeEach(() => Lecture.remove({}));

afterEach(() => Lecture.remove({}));

describe('Lecture model tests', () => {
  it('should return Lecture time', () => {
    const thirdLecture = new Lecture({ time: '11:30' });
    return thirdLecture
      .save()
      .then(lecture => Lecture.find({ _id: lecture._id }))
      .then((Lectures) => {
        expect(Lectures[0].getTime()).toBe('11:30');
      });
  });
});

afterAll(() => mongoose.connection.close());
