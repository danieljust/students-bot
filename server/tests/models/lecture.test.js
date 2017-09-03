const mongoose = require('mongoose');
const Lecture = require('../../models/Lecture');
const Discipline = require('../../models/Discipline');
const Week = require('../../models/Week');
const lectureService = require('../../dao/mongo/lectureService');
const weekService = require('../../dao/mongo/weekService');

beforeAll(() => mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
}));

beforeEach(() => Lecture.remove({}));

afterEach(() => Lecture.remove({}));

afterAll(() => mongoose.connection.close());

describe('Lecture model tests', () => {
  it('should return lecture time', () => {
    return lectureService.create({time: '11:30'})
      .then(lecture => lectureService.findOneById(lecture._id))
      .then(lecture => {
        expect(lecture.time).toBe('11:30');
      });
  });

  it('should return lecture index 3', () => {
    return lectureService.create({time: '11:30'})
      .then(lecture => lectureService.findOneById(lecture._id))
      .then(lecture => {
        expect(lecture.index).toBe(3);
      });
  });
});
describe('Lecture tests relations with other models', () => {
  it('should return Системы информационно-аналитического мониторинга', () => {
    const disciplineName = 'Системы информационно-аналитического мониторинга';
    const systemDiscipline = new Discipline({
      teacher: 'Шилер',
      name: disciplineName
    });
    const myPromises = [
      weekService.create({number: 2}),
      systemDiscipline.save(),
      lectureService.create({time: '08:00', day: 1})
    ];
    return Promise.all(myPromises)
      .then(([week, discipline, lecture]) => {
        lecture.week = week._id;
        lecture.discipline = discipline._id;
        discipline.lectures.push(lecture);
        return Promise.all([discipline.save(), lecture.save()]);
      })
      .then(([discipline, lecture]) =>
        Promise.all([
          discipline,
          Lecture
            .findOne({_id: lecture._id})
            .populate('discipline')
            .exec()])
      )
      .then(([discipline, lecture]) => {
        expect(lecture.discipline.name).toBe(discipline.name);
      });
  });
  it('should return 2 for week number', () =>
    Promise.all([
      weekService.create({number: 2}),
      lectureService.create({time: '08:00', day: 1})
    ])
      .then(([week, lecture]) => lectureService.addWeek(lecture, week))
      .then(lecture =>
        Lecture
          .findOne({_id: lecture._id})
          .populate('week')
          .exec()
      )
      .then(lecture => {
        expect(lecture.week.number).toBe(2);
      })
  );
});
