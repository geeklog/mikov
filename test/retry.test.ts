import retry from '../src/control-flow/retry';
import { expect } from 'chai';

describe('retry', () => {

  it('1', async () => {
    let i = 0;
    const a = await retry(() => {
      i += 2;
      if (i < 6) {
        throw new Error(`${i}`);
      }
      return i;
    }, {
      times: 3,
      interval: 200
    })();
    expect(a).equal(6);
  });

  it('2', async () => {
    let i = 0;
    const fn = retry(() => {
      i += 2;
      if (i < 6) {
        throw new Error(`${i}`);
      }
      return i;
    }, {
      times: 3,
      interval: () => 100 + Math.random() * 200
    });
    const a = await fn();
    expect(a).equal(6);
  });

});
