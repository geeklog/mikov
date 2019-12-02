import { concurrent, sleep } from '../src';

const delayNumber = n => async () => {
  await sleep(1000);
  return n;
};

const createError = () => () => {
  throw new Error('eh-oh');
};

describe('concurrent', () => {
  it('1', async () => {
    const q = concurrent(3);
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(delayNumber(4));
    q.go(delayNumber(5));
    q.one(r => r);
    q.done(() => '');
  });

  it('2', async () => {
    const q = concurrent(3, {onErrorOccur: 'skip', suppressError: true});
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(delayNumber(4));
    q.go(delayNumber(5));
  });

  it('3', async () => {
    const q = concurrent(3, {onErrorOccur: 'skip', suppressError: true});
    q.go(delayNumber(1));
    q.go(delayNumber(2));
    q.go(delayNumber(3));
    q.go(createError());
    q.go(delayNumber(4));
    q.go(delayNumber(5));
    q.go(delayNumber(6));
    q.go(delayNumber(7));
    q.one(r => r);
    q.done(() => '');
  });

  it('4', async () => {
    const q = concurrent(3, {onErrorOccur: 'break', suppressError: true});
    q.one(r => r);
    q.done(() => '');
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

