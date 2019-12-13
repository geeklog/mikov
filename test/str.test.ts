import * as str from '../src/str';
import { assert } from 'chai';
import { padEndMax, print2d } from '../src/str/lines';

describe('str', () => {

  it('explode', () => {
    assert.deepEqual(str.explode('a b  c', /\s+/), ['a', ' ', 'b', '  ', 'c']);
    assert.deepEqual(str.explode(' a b  c', /\s+/), [' ', 'a', ' ', 'b', '  ', 'c']);
    assert.deepEqual(str.explode(' a b  c ', /\s+/), [' ', 'a', ' ', 'b', '  ', 'c', ' ']);
    assert.deepEqual(str.explode('  a b  c ', /\s+/), ['  ', 'a', ' ', 'b', '  ', 'c', ' ']);
    assert.deepEqual(str.explode('  a b  c  ', /\s+/), ['  ', 'a', ' ', 'b', '  ', 'c', '  ']);
    assert.deepEqual(str.explode('a b  c', /\s+/, (val, i) => i + ':' + val), ['0:a', ' ', '1:b', '  ', '2:c']);
    assert.deepEqual(str.explode(
      '  a b  c  ', /\s+/, (val, i) => i + ':' + val),
      ['  ', '0:a', ' ', '1:b', '  ', '2:c', '  ']
    );
  });

  it('removeLast', () => {
    str.removeLastChar('abc:', ':');
  });

  it('padEndMax', () => {
    assert.deepEqual(padEndMax(['a', 'aa', 'aaa'], ' '), ['a  ', 'aa ', 'aaa']);
  });

  it('print2d', () => {
    assert.deepEqual(print2d([[1, 2], [3, 4]]), '1 2\n3 4');
  });

});
