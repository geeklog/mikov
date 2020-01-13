import { assert } from 'chai';
import { selectByIndices } from '../src/fn/op';

describe('fn', () => {
  it('selectByIndices', async () => {
    assert.deepEqual(selectByIndices([0, 2])(['a', 'b', 'c']), ['a', 'c']);
  });
});
