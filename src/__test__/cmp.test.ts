import { expect } from 'chai';
import { cmp } from '..';

describe('cmp', () => {
  it('should equal', async () => {
    expect(cmp(1, 1)).equal(0);
    expect(cmp(1, 2)).equal(-1);
    expect(cmp('1', '1')).equal(0);
    expect(cmp('1', '2')).equal(-1);
    expect(cmp('2', '1')).equal(1);
    expect(cmp('27', '157')).equal(-1);
    expect(cmp([1, 2, 3], [1, 2, 3])).equal(0);
    expect(cmp([3, 2, 1], [1, 2, 3])).equal(1);
    expect(cmp([1, 2, 3], [3, 2, 1])).equal(-1);
    expect(cmp([1, undefined, 3], [1, undefined, 3])).equal(0);
    expect(cmp([1, 2, 3], [1, 3])).equal(-1);
    expect(cmp([undefined, 2, 3], [1, 2, 3])).equal(-1);
    expect(cmp([1, 2, 3], [undefined, 2, 3])).equal(1);
  });
});
