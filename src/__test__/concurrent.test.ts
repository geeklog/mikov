import { concurrent } from '..';
import { sleep } from '../time';

const delayNumber = n => async () => {
  console.log('call', n);
  await sleep(1000);
  return n;
};

const createError = () => () => {
  throw new Error('eh-oh');
};

describe('applyFilePathPattern', () => {
  it('1', async () => {
    const q = concurrent(3);
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(delayNumber(4));
    q.go(delayNumber(5));
    q.one(r => console.log('return:', r));
    q.done(() => console.log('done'));
  });

  it('2', async () => {
    const q = concurrent(3, {onErrorOccur: 'skip'});
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(delayNumber(4));
    q.go(delayNumber(5));
  });

  it('3', async () => {
    const q = concurrent(3, {onErrorOccur: 'skip'});
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(createError());
    q.go(delayNumber(4));
    q.go(delayNumber(5));
    q.go(delayNumber(6));
    q.go(delayNumber(7));
    q.one(r => console.log('return:', r));
    q.done(() => console.log('done'));
    q.error(err => console.error('error:', err));
  });

  it('4', async () => {
    const q = concurrent(3, {onErrorOccur: 'break'});
    q.one(r => console.log('return:', r));
    q.error(err => console.error('error:', err));
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(createError());
    q.go(delayNumber(4));
    q.go(delayNumber(5));
    q.go(delayNumber(6));
    q.go(delayNumber(7));
  });
});

