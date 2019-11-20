const _ = require('../mikov');

const a = _.cases(2, [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
  [true, 'd']
]);

console.log(a);