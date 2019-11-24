import { sequential } from '..';
import { sleep } from '../time';

const q = sequential();

describe('sequential', () => {
  it('go', () => {
    q.go(async () => {
      await sleep(1000);
      console.log('1');
    });
    q.go(async () => {
      await sleep(1000);
      console.log('2');
    });
    q.go(async () => {
      await sleep(1000);
      console.log('3');
    });
  });
});
