const sum = require('./sum');

// it === test
it('should return 8 if adding 3 and 5', () => {
  // console.log(expect(sum(3,5)));
  expect(sum(3, 5)).toBe(8);
});

it('should return 15 if adding 7 and 8', () => {
  // console.log(expect(sum(3,5)));
  expect(sum(7, 8)).toBe(15);
});