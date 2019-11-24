import * as str from '../str';
import { assert } from 'chai';

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

});
