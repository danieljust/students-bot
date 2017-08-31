const mongoose = require('mongoose');
const Week = require('../../models/Week');


beforeAll(() => {
    return mongoose
        .connect('mongodb://localhost/test');
});

afterEach(() => {
    return Week.remove({});
});

describe('kitten tests', () => {
    it('should add kitten with name snowball', () => {
        const snowball = new Week({name: 'snowball'});
        return snowball
            .save()
            .then(kitten => Kitten.find({_id: kitten._id}))
            .then(kittens => {
                expect(kittens[0].name).toBe('snowball');
            });
    });
});
afterAll(() => {
    return mongoose.connection.close();
});
