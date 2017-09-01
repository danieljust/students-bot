const mongoose = require('mongoose');
const Lecture = require('../../models/Lecture');

beforeAll(() => mongoose
  .connect('mongodb://localhost/test'));

beforeEach(() => Lecture.remove({}));

afterEach(() => Lecture.remove({}));

describe('Lecture model tests', () => {
  it('should return lecture time', () => {
    const thirdLecture = new Lecture({time: '11:30'});
    return thirdLecture
      .save()
      .then(lecture => Lecture.findOne({_id: lecture._id}))
      .then(lectures => {
        expect(lectures.time).toBe('11:30');
      });
  });
  it('should return lecture index 3', () => {
    const thirdLecture = new Lecture({time: '11:30'});
    return thirdLecture
      .save()
      .then(lecture => Lecture.findOne({_id: lecture._id}))
      .then(lecture => {
        expect(lecture.index).toBe(3);
      });
  });
});

afterAll(() => mongoose.connection.close());
