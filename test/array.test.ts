import { replaceLast, splitAt, splitTail, splitBy, transpose } from '../src/array';
import { assert } from 'chai';

describe('cases', () => {
  it('replaceLast', async () => {
    assert.deepEqual(replaceLast([1, 2, 3], () => 4), [1, 2, 4]);
  });

  it('splitAt', () => {
    assert.deepEqual(splitAt([1, 2, 3], 1), [[1], [2, 3]]);
  });

  it('splitTail', () => {
    assert.deepEqual(splitTail([1, 2, 3]), [[1, 2], 3]);
  });

  it('splitBy', () => {
    assert.deepEqual(splitBy([1, 2, 3, 1, 2, 3, 1, 2, 3], 3), [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
    assert.deepEqual(splitBy([1, 2, 3], 1), [[1], [2], [3]]);
    assert.deepEqual(splitBy([1, 2, 3], 4), [[1, 2, 3]]);
  });

  it('transpose', () => {
    assert.deepEqual(transpose([[1, 2, 3], [1, 2, 3]]), [[1, 1], [2, 2], [3, 3]]);
  });
});
