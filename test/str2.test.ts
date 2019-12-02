import { assert } from "chai";
// tslint:disable-next-line: max-line-length
import { toEndOfPrevSpace, toStartOfNextWord, toStartOfCurrentWord, removeCharBetween, charCodes, replaceFirst } from '../src/str/index';

assert.equal(toEndOfPrevSpace('abc  def', 8), 4);
assert.equal(toEndOfPrevSpace('abc  def  ', 9), 4);
assert.equal(toEndOfPrevSpace('abc  def  ghi', 11), 9);
assert.equal(toEndOfPrevSpace('abcdefghi', 4), -1);

assert.equal(toStartOfNextWord('abcdefghi', 1), -1);
assert.equal(toStartOfNextWord('abcd efghi', 1), 5);

assert.equal(toStartOfCurrentWord('abc  defgh', 8), 5);
assert.equal(toStartOfCurrentWord(' abcdefgh', 8), 1);
assert.equal(toStartOfCurrentWord(' abcd efgh', 8), 6);
assert.equal(toStartOfCurrentWord('abc  defgh', 4), 4);

assert.equal(removeCharBetween('0123456', 1, 5), '06');
assert.equal(removeCharBetween('0123456', 0, 0), '123456');
assert.equal(removeCharBetween('0123456', 1, 1), '023456');
assert.equal(removeCharBetween('0123456', 6, 6), '012345');
assert.equal(removeCharBetween('0123456', 7, 7), '012345');
assert.equal(removeCharBetween('0123456', 7, 8), '012345');
assert.equal(removeCharBetween('0123456', 6, 8), '012345');
assert.equal(removeCharBetween('0123456', 5, 8), '01234');

assert.equal(replaceFirst('abc', 'b'), 'bbc');
assert.equal(replaceFirst('abc', c => `(${c})`), '(a)bc');
