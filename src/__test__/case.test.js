import { cases } from '..';
import { expect } from 'chai';

describe('cases', () => {
  it('matches caches', async () => {
    const a = cases(2, [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [true, 'd'],
    ]);
    expect(a).equal('b');
  });
});
