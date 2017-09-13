const lectureController = require('../../controllers/lectureController');
const Lecture = require('../../models/Lecture');
const mongoose = require('mongoose');
const P = require('bluebird');
const Discipline = require('../../models/Discipline');
const Week = require('../../models/Week');

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
  it('should show recently created lecture', () => {
    lectureController.create({time: '08:00', day: 1})
      .then(lecture => lectureController.show(lecture.id))
      .then(lecture => expect(lecture.day).toBe(1))
  });
  it('should update lecture info', () => {
    lectureController.create({time: '08:00', day: 1})
      .then(lecture => {
        const newInfo = {
          day: 23,
          time: '09:45'
        };
        return lectureController.update(lecture.id, newInfo);
      })
      .then(lectureId => lectureController.show(lectureId))
      .then(lecture => expect(lecture.day).toBe(23))
  });
  it('should delete lecture according to id', () =>
    lectureController.create({time: '08:00', day: 1})
      .then(lecture => P.props({
        deleted: lectureController.deleteOneById(lecture.id),
        id: lecture.id
      }))
      .then(result => lectureController.show(result.id))
      .then(result => expect(result).toBeNull()));
  it('should add discipline to lecture', () =>
    Discipline({teacher: 'Schiller', name: 'BIAS'}).save()
      .then(discipline =>
        P.props({
          discipline,
          lecture: lectureController.create({time: '08:00', day: 1})
        })
      )
      .then(result => lectureController.addDiscipline({lecture: result.lecture, discipline: result.discipline}))
      .then(lecture => Discipline.findOne({_id: lecture.discipline}))
      .then(discipline => expect(discipline.teacher).toBe('Schiller')));
  it('should add week to lecture', () => {
    Week({number: 2}).save()
      .then(week =>
        P.props({
          week,
          lecture: lectureController.create({time: '08:00', day: 1})
        }))
      .then(result =>
        lectureController.addWeek({
          lecture: result.lecture,
          week: result.week
        }))
      .then(lecture => Week.findOne({_id: lecture.week}))
      .then(week => expect(week.number).toBe(2))
  })
});
