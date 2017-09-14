const models = require('../../models');
const lectureService = require('../../dao/postgres/lectureService');
const P = require('bluebird');

beforeAll(() => models.sequelize.sync());
beforeEach(() => lectureService.deleteAll());
afterAll(() => models.sequelize.close());

describe('lecture controllers tests', () => {
  it('should create lecture with specified fields', () =>
    lectureService
      .create({time: '08:00', day: 1})
      .then(lecture => lectureService.findOneById(lecture.id))
      .then(lecture => expect(lecture.day).toBe(1)));
  it('should delete created lecture', () =>
    lectureService.create({time: '08:00', day: 1})
      .then(lecture => P.props({id: lecture.id, lecture: lectureService.deleteOneById(lecture.id)})
        .then(result => lectureService.findOneById(result.id))
        .then(result => expect(result).toBeNull())));
});
