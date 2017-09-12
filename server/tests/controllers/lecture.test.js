const lectureController = require('../../controllers/lectureController');
const Lecture = require('../../models/Lecture');
const mongoose = require('mongoose');

beforeAll(() => mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
}));

beforeEach(() => Lecture.remove({}));

afterEach(() => Lecture.remove({}));

afterAll(() => mongoose.connection.close());

describe('lectureController tests', () => {
  it('should create lecture properly using controller method', () =>
    lectureController.create({time: '08:00', day: 1})
      .then(lecture => {
        expect.assertions(2);
        expect(lecture.time).toBe('08:00');
        expect(lecture.day).toBe(1);
      }));
});
