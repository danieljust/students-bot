const lectureController = require('../../controllers/lectureController');
const disciplineController = require('../../controllers/disciplineController');
const P = require('bluebird');
const models = require('../../models');

beforeAll(() => models.sequelize.sync());

afterAll(() => models.sequelize.close());

describe('basic CRUD tests', () => {
  beforeEach(() => lectureController.deleteAll());
  beforeEach(() => disciplineController.deleteAll());
  it('should create and view lecture', () => {
    lectureController.create({time: '08:00', day: 2})
      .then(lecture => lectureController.show(lecture.id))
      .then(lecture => {
        expect(lecture.day).toBe(2);
        expect(lecture.time).toBe('08:00');
      });
  });
  it('should update lecture info', () =>
    lectureController.create({time: '08:00', day: 2})
      .then(lecture => lectureController.update({
        lecture,
        info: {
          time: '09:00',
          day: 3
        }
      }))
      .then(lecture => {
        const i = 0;
        expect(lecture.day).toBe(3);
        expect(lecture.time).toBe('09:00');
      })
  );
  it('should delete lecture by id', () =>
    lectureController.create({time: '08:00', day: 2})
      .then(lecture =>
        P.props({
          deleted: lectureController.deleteOneById(lecture.id),
          id: lecture.id
        }))
      .then(result => lectureController.show(result.id))
      .then(result => expect(result).toBeNull())
  );
  it('should delete all lectures', () =>
    P.all([
      lectureController.create({time: '08:00', day: 2}),
      lectureController.create({time: '08:00', day: 1})
    ])
      .then(() => lectureController.deleteAll())
      .then(() => lectureController.showAll())
      .then(result => expect(result.length).toBe(0))
  );
  it('should add week to lecture', () =>
    P.props({
      week: models.week.build({number: 1}).save(),
      lecture: lectureController.create({time: '08:00', day: 1})
    })
      .then(result =>
        P.props({
          lecture: lectureController.addWeek({lecture: result.lecture, week: result.week}),
          weekId: result.week.id
        }))
      .then(result => {
        expect(result.lecture.weekId).toBe(result.weekId)
      })
      .catch(err => console.log(err)));
  it('should add discipline to lecture', () =>
    P.props({
      discipline: disciplineController.create({teacher: 'Schiller', name: 'BIAS'}),
      lecture: lectureController.create({time: '08:00', day: 1})
    })
      .then(result =>
        P.props({
          lecture: lectureController.addDiscipline({lecture: result.lecture, discipline: result.discipline}),
          disciplineId: result.discipline.id
        }))
      .then(result => {
        expect(result.lecture.disciplineId).toBe(result.disciplineId);
      })
      .catch(err => console.log(err)));
});
