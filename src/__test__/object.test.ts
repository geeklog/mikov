import {transferAttribute} from '..';
import { assert } from 'chai';

describe('object', () => {

  it('transferAttribute', async () => {
    const a = { k1: 'v1', k2: 'v2' };
    const b = { };
    transferAttribute(a, b, 'k1', v => `(${v})`);
    assert.deepEqual(a as any, {k2: `v2`});
    assert.deepEqual(b as any, {k1: '(v1)'});
  });

});
