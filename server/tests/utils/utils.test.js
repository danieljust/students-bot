const {calculateIndex} = require('../../utils/calculateIndex');

describe("test calculating Index", () => {
  it('should return 3', () => {
    expect(calculateIndex('11:35')).toBe(3);
  });
});
