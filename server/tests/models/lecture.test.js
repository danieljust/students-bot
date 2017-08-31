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
      .then(lecture => Lecture.find({_id: lecture._id}))
      .then(lectures => {
        expect(lectures[0].time).toBe('11:30');
      });
  });
 it('should return lecture index 3', () => {
    const thirdLecture = new Lecture({time: '11:30'});
    return thirdLecture
      .save()
      .then(lecture => Lecture.find({_id: lecture._id}))
      .then(lectures => {
        expect(lectures[0].kek).toBe(3);
      });
  });

});

afterAll(() => mongoose.connection.close());
