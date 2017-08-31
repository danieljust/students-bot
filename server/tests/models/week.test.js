const mongoose = require('mongoose');
const Week = require('../../models/Week');

beforeAll(() => {
    return mongoose
        .connect('mongodb://localhost/test');
});

beforeEach(() => {
    return Week.remove({});
});

afterEach(() => {
    return Week.remove({});
});

describe('week model tests', () => {
    it('should return odd value', () => {
        const oddWeek = new Week({number: 1});
        return oddWeek
            .save()
            .then(week => Week.find({_id: week._id}))
            .then(weeks => {
                expect(weeks[0].getOrder()).toBe('odd');
            });
    });

    it('should return even value', () => {
        const evenWeek = new Week({number: 2});
        return evenWeek
            .save()
            .then(week => Week.find({_id: week._id}))
            .then(weeks => {
                expect(weeks[0].getOrder()).toBe('even');
            });
    })

    it('should return number of a week', () => {
        const firstWeek = new Week({number: 10});
        return firstWeek
            .save()
            .then(week => Week.find({_id: week._id}))
            .then(weeks => {
                expect(weeks[0].getNumber()).toBe(10);
            });
    });
});

afterAll(() => {
    return mongoose.connection.close();
});
