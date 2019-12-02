import { sequential, sleep } from '../src';

const q = sequential();

describe('sequential', () => {
  it('go', () => {
    q.go(async () => {
      await sleep(500);
    });
    q.go(async () => {
      await sleep(500);
    });
    q.go(async () => {
      await sleep(500);
    });
  });
});
