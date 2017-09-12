/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Task = require('../../models/Task');
const taskService = require('../../dao/mongo/taskService');
const moment = require('moment');

beforeAll(() => mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
}));

beforeEach(() => Task.remove({}));

afterEach(() => Task.remove({}));

afterAll(() => mongoose.connection.close());

describe('task model tests', () => {
  it('should return compare deadlines', () => taskService.create({
    deadline: moment('25-12-1995', 'DD-MM-YYYY'),
    description: 'Awesome_description' })
    .then(task => taskService.findOneById(task._id))
    .then((task) => {
      expect(moment('25-12-1995', 'DD-MM-YYYY').isSame(task.deadline)).toBeTruthy();
    }));
  it('should return same description', () => taskService.create({
    deadline: moment('25-12-1995', 'DD-MM-YYYY'),
    description: 'Awesome_description' })
    .then(task => taskService.findOneById(task._id))
    .then((task) => {
      expect(task.description).toBe('Awesome_description');
    }));
});
