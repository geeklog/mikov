import str from '../str';
const run = fn => fn();

(() => {
  const assert = require('power-assert');
  assert.deepEqual(str.explode('a b  c', /\s+/), ['a',' ', 'b', '  ', 'c']);
  assert.deepEqual(str.explode(' a b  c', /\s+/), [' ','a',' ', 'b', '  ', 'c']);
  assert.deepEqual(str.explode(' a b  c ', /\s+/), [' ','a',' ', 'b', '  ', 'c', ' ']);
  assert.deepEqual(str.explode('  a b  c ', /\s+/), ['  ','a',' ', 'b', '  ', 'c', ' ']);
  assert.deepEqual(str.explode('  a b  c  ', /\s+/), ['  ','a',' ', 'b', '  ', 'c', '  ']);
  assert.deepEqual(str.explode('a b  c', /\s+/, (val,i) => i+':'+val), ['0:a',' ', '1:b', '  ', '2:c']);
  assert.deepEqual(str.explode('  a b  c  ', /\s+/, (val,i) => i+':'+val), ['  ','0:a',' ', '1:b', '  ', '2:c', '  ']);
})

run(() => {
  console.log(str.removeLastChar('abc:', ':'));
})