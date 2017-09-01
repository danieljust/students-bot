const {calculateIndex} = require('../../utils/calculateIndex');

describe("test calculating Index", () => {
  it('should return 1', () => {
    expect(calculateIndex('08:00')).toBe(1);
  });
  it('should return 1', () => {
    expect(calculateIndex('08:30')).toBe(1);
  });
  it('should return 2', () => {
    expect(calculateIndex('11:20')).toBe(2);
  });
  it('should return "break"', () => {
    expect(calculateIndex('13:20')).toBe("break");
  });
  it('should return 3', () => {
    expect(calculateIndex('13:55')).toBe(4);
  });
  it('should return 4', () => {
    expect(calculateIndex('16:45')).toBe(5);
  });
  it('should return "break"', () => {
    expect(calculateIndex('17:55')).toBe("break");
  });
});
