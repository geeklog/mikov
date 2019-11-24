import { replaceLast } from '../array';
import { assert } from 'chai';

describe('cases', () => {
  it('replaceLast', async () => {
    assert.deepEqual(replaceLast([1, 2, 3], () => 4), [1, 2, 4]);
  });
});
