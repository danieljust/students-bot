/* eslint-disable no-undef */
const mongoose = require('mongoose');
const P = require('bluebird');
const Lecture = require('../../models/Lecture');
const Discipline = require('../../models/Discipline');
const disciplineService = require('../../dao/mongo/disciplineService');
const lectureService = require('../../dao/mongo/lectureService');
const weekService = require('../../dao/mongo/weekService');

beforeAll(() => mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
}));

beforeEach(() => Lecture.remove({}));

afterEach(() => Lecture.remove({}));

afterAll(() => mongoose.connection.close());

describe('Lecture model tests', () => {
  it('should return lecture time', () => lectureService.create({time: '11:30'})
    .then(lecture => lectureService.findOneById(lecture._id))
    .then(lecture => {
      expect(lecture.time).toBe('11:30');
    }));

  it('should return lecture index 3', () => lectureService.create({time: '11:30'})
    .then(lecture => lectureService.findOneById(lecture._id))
    .then((lecture) => {
      expect(lecture.index).toBe(3);
    }));
});


describe('Lecture tests relations with other modelsMongo', () => {
  it('should return Системы информационно-аналитического мониторинга', () => P.props({
    discipline: disciplineService.create({
      teacher: 'Шилер',
      name: 'Системы информационно-аналитического мониторинга',
    }),
    lecture: lectureService.create({time: '08:00', day: 1}),
  })
    .then(({discipline, lecture}) =>
      disciplineService.addLecture(discipline, lecture),
    )
    .then(({lecture}) =>
      lectureService
        .findOneById(lecture._id)
        .populate('discipline')
        .exec()
    )
    .then(lecture => {
      expect(lecture.discipline.name).toBe('Системы информационно-аналитического мониторинга');
    }));
  it('should check that discipline contains 3 lectures', () => {
    const myDiscipline = new Discipline({
      teacher: 'Шилер',
      name: 'Системы информационно-аналитического мониторинга',
    });
    const myPromises = [
      myDiscipline.save(),
      lectureService.create({time: '8:00', day: 1}),
      lectureService.create({time: '9:45', day: 3}),
      lectureService.create({time: '11:30', day: 3}),
    ];
    return Promise.all(myPromises)
      .then(([discipline, first, second, third]) => {
        first.discipline = discipline._id;
        second.discipline = discipline._id;
        third.discipline = discipline._id;
        discipline.lectures.push(first);
        discipline.lectures.push(second);
        discipline.lectures.push(third);
        return Promise.all([discipline.save(), first.save(), second.save(), third.save()]);
      })
      .then(([discipline, first, second, third]) =>
        Promise.all([
          discipline,
          Lecture
            .find({_id: first.discipline._id})
            .populate('discipline')
            .exec()]),
      )
      .then(([discipline]) => {
        expect(discipline.lectures.length).toBe(3);
      });
  });
  it('should check that discipline contains determined lectures', () => {
    const myDiscipline = new Discipline({
      teacher: 'Шилер',
      name: 'Системы информационно-аналитического мониторинга',
    });
    const myPromises = [
      myDiscipline.save(),
      lectureService.create({time: '8:00', day: 1}),
      lectureService.create({time: '9:45', day: 3}),
      lectureService.create({time: '11:30', day: 3}),
    ];
    return Promise.all(myPromises)
      .then(([discipline, ...lectures]) => {
        const lecturePromises = [];
        lectures.map((lecture) => {
          lecture.discipline = discipline._id;
          discipline.lectures.push(lecture);
          lecturePromises.push(lecture.save());
        });
        return Promise.all([
          discipline.save(),
          lecturePromises,
        ]);
      })
      .then(([discipline]) =>
        Discipline
          .findById(discipline._id)
          .populate('lectures')
          .exec(),
      )
      .then((discipline) => {
        expect(discipline.lectures.length).toBe(3);
      });
  });
  it('should return 2 for week number', () =>
    Promise.all([
      weekService.create({number: 2}),
      lectureService.create({time: '08:00', day: 1}),
    ])
      .then(([week, lecture]) => lectureService.addWeek({lecture, week}))
      .then(lecture =>
        lectureService
          .findOneById(lecture._id)
          .populate('week')
          .exec(),
      )
      .then((lecture) => {
        expect(lecture.week.number).toBe(2);
      }),
  );
});
