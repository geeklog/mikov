import { cases } from '../src/index';
import { expect } from 'chai';
import { isNumber } from '../src/is';

describe('cases', () => {
  it('matches numbers', () => {
    const m = cases(1.5, [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    expect(m).equal('b');
  });

  it('matches true', () => {
    const m = cases('none', [
      ['a', 'a'],
      ['b', 'b'],
      ['c', 'c'],
      [true, 'd'],
    ]);
    expect(m).equal('d');
  });

  it('matches multiple conditions', () => {
    const m = cases('bb', [
      ['a', 'aa', 1],
      ['b', 'bb', 2],
      ['c', 'cc', 3],
    ]);
    expect(m).equal(2);
  });

  it('matches regexp', () => {
    const m = cases('ccc', [
      ['a', 'aa', 1],
      ['b', 'bb', 2],
      [/c.*/, 3],
    ]);
    expect(m).equal(3);
  });

  it('matches filter function', () => {
    const m = cases(128, [
      ['0',    'black', 'black'],
      ['r',    'red', 'red'],
      [n => isNumber(n) && n >= 0 && n <= 255, 'color256'],
    ]);
    expect(m).equal('color256');
  });

  it('should shorcuts', () => {
    const m = cases('0', [
      ['0', '1', 'black'],
      ['2', '3', 'red'],
    ]);
    expect(m).equal('black');
  });

  it('ignore undefined', () => {
    const m = cases('r', [
      ['0', 'black', undefined, 'black'],
      ['r', 'red', 'red'],
    ]);
    expect(m).equal('red');
  });

});
