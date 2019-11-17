import {equals as cmp} from '../index';

const assert = { equal: (a: any, b: any) => console.log(a === b, a, b) };

assert.equal(cmp(1, 1),  0);
assert.equal(cmp(1, 2), -1);
assert.equal(cmp('1', '1'),  0);
assert.equal(cmp('1', '2'), -1);
assert.equal(cmp('2', '1'),  1);
assert.equal(cmp('27', '157'),  -1);
assert.equal(cmp([1, 2, 3], [1, 2, 3]), 0);
assert.equal(cmp([3, 2, 1], [1, 2, 3]), 1);
assert.equal(cmp([1, 2, 3], [3, 2, 1]), -1);
assert.equal(cmp([1, undefined, 3], [1, undefined, 3]), 0);
assert.equal(cmp([1, 2, 3], [1, 3]), -1);
assert.equal(cmp([undefined, 2, 3], [1, 2, 3]), -1);
assert.equal(cmp([1, 2, 3], [undefined, 2, 3]), 1);
