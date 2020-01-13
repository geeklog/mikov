import { replaceLast, splitAt, splitTail, splitBy, transpose, classifyIndices } from '../src/array';
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

  it('classifyIndices', () => {
    assert.deepEqual(classifyIndices([1, 2, 3, 4, 5], a => a % 2 === 0), [[1, 3], [0, 2, 4]]);
    assert.deepEqual(classifyIndices([1, 2, 3, 4, 5], (a, i) => i % 2 === 0), [[0, 2, 4], [1, 3]]);
  });

});
