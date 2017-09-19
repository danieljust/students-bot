const disciplineController = require('../../controllers/disciplineController');
const P = require('bluebird');
const models = require('../../models');

beforeAll(() => models.sequelize.sync());

afterAll(() => models.sequelize.close());

describe('basic CRUD tests for discipline', () => {
  beforeEach(() => disciplineController.deleteAll());
  it('should create and view discipline', () => {
    disciplineController.create({teacher: 'Иванов', name: 'Математика'})
      .then(discipline => disciplineController.show(discipline.id))
      .then(discipline => {
        expect(discipline.teacher).toBe('Иванов');
        expect(discipline.name).toBe('Математика');
      });
  });
  it('should update discipline info', () =>
    disciplineController.create({teacher: 'Иванов', name: 'Математика'})
      .then(discipline => disciplineController.update({
        discipline,
        info: {
          teacher: 'Петров',
          name: 'Алгебра'
        }
      }))
      .then(discipline => {
        expect(discipline.teacher).toBe('Петров');
        expect(discipline.name).toBe('Алгебра');
      })
  );
  it('should delete discipline by id', () =>
    disciplineController.create({teacher: 'Иванов', name: 'Математика'})
      .then(discipline =>
        P.props({
          deleted: disciplineController.deleteOneById(discipline.id),
          id: discipline.id
        }))
      .then(result => disciplineController.show(result.id))
      .then(result => expect(result).toBeNull())
  );
  it('should delete all disciplines', () =>
    P.all([
      disciplineController.create({teacher: 'Иванов', name: 'Математика'}),
      disciplineController.create({teacher: 'Петров', name: 'Алгебра'})
    ])
      .then(() => disciplineController.deleteAll())
      .then(() => disciplineController.showAll())
      .then(result => expect(result.length).toBe(0))
  );
});
